import get from 'lodash.get'
import vm from 'vm'
import { notify } from '../notify'
import { Config } from './config.types'

function validateSyntax(config: string) {
  try {
    return new vm.Script(config, { filename: '.wallch.js', displayErrors: true })
  } catch (error) {
    notify(error)
    return undefined
  }
}

function extract(script?: vm.Script): Record<string, any> {
  const module: Record<string, any> = {}
  get(script, 'runInNewContext', () => {})({ module })

  if (!module.exports) {
    throw new Error('Error reading configuration: `module.exports` not set')
  }

  return module.exports
}

export function extractDefault(config: string) {
  return extract(validateSyntax(config))
}

export function init(config: Config) {
  const script = validateSyntax(config.userConfig)
  if (script) {
    const configFile = extract(script)

    if (!configFile.config) {
      return config.defaultConfig
    }
    return configFile
  }
  return config.defaultConfig
}
