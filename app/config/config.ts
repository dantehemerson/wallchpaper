import { readFileSync } from 'fs'
import get from 'lodash.get'
import { notify } from '../notify'
import { Config } from './config.types'
import { extractDefault, init } from './init'
import { configPath, defaultConfigPath } from './paths'

let defaultConfig: Record<string, any> | undefined

function _importConfig(): Config {
  try {
    const defaultConfigRaw = readFileSync(defaultConfigPath, 'utf8')
    const defaultConfigParsed = extractDefault(defaultConfigRaw)

    // Import user config
    try {
      const userConfig = readFileSync(configPath, 'utf8')
      return {
        userConfig,
        defaultConfig: defaultConfigParsed
      }
    } catch (error) {
      return {
        userConfig: defaultConfigRaw,
        defaultConfig: defaultConfigParsed
      }
    }
  } catch (error) {
    notify(error)
  }
}

export function importConfig() {
  const imported = _importConfig()
  defaultConfig = get(imported, 'defaultConfig')

  const result = init(imported)

  return result
}

export function getDefaultConfig() {
  return !defaultConfig ? get(importConfig, 'defaultConfig') : defaultConfig
}
