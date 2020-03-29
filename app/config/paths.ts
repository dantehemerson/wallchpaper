import { homedir } from 'os'
import { join } from 'path'

const configDir = homedir()

const configFile = '.wallchpaper.js'
const defaultConfigFile = 'default.js'

const configPath = join(configDir, configFile)
const defaultConfigPath = join(__dirname, defaultConfigFile)

export { configDir, configPath, defaultConfigPath }
