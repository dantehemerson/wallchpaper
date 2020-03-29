export type Configs = {
  userConfig: string
  defaultConfig: ConfigFile
}

export type ConfigApp = {
  time?: string
  folders?: string[]
}

export type ConfigFile = {
  config?: ConfigApp
}

export type ConfigModule = {
  exports?: ConfigFile
}
