import vm from 'vm'
import { notify } from '../logger'
import { Configs, ConfigFile, ConfigModule } from './config.types'
import { configFile } from './paths'
import mergeConfigs from 'lodash.merge'

function validateSyntax(code: string) {
  try {
    return new vm.Script(code, { filename: configFile, displayErrors: true })
  } catch (error) {
    notify(error)
  }
}

function extract(script?: vm.Script): ConfigFile {
  const module: ConfigModule = {}
  const context = vm.createContext({ module })

  script.runInNewContext && script.runInContext(context)

  if (!module.exports) {
    throw new Error('Error reading Wallchpaper configuration: `module.exports` not set')
  }
  return module.exports
}

export function extractDefault(configCode: string): ConfigFile {
  return extract(validateSyntax(configCode))
}

export function init(configs: Configs) {
  const script = validateSyntax(configs.userConfig)
  if (script) {
    const userConfigFile = extract(script)

    if (!userConfigFile.config) {
      return configs.defaultConfig
    }

    // Replace default config keys with user config
    return mergeConfigs(configs.defaultConfig, userConfigFile)
  }
  return configs.defaultConfig
}
