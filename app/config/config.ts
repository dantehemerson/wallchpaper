import { readFileSync } from 'fs'
import get from 'lodash.get'
import { notify } from '../notify'
import { ConfigFile, Configs } from './config.types'
import { extractDefault, init } from './init'
import { configPath, defaultConfigPath } from './paths'

let defaultConfig: ConfigFile | undefined

function importConfigs(): Configs {
  try {
    const defaultConfigRaw = readFileSync(defaultConfigPath, 'utf8')
    const defaultConfigParsed = extractDefault(defaultConfigRaw)

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
  const importedConfigs = importConfigs()
  defaultConfig = get(importedConfigs, 'defaultConfig')

  const result = init(importedConfigs)

  return result
}

export function getDefaultConfig() {
  return !defaultConfig ? get(importConfig, 'defaultConfig') : defaultConfig
}
