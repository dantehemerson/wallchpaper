export type Configs = {
  userConfig: string
  defaultConfig: ConfigFile
}

export type ConfigFile = {
  config?: {
    time?: string
    folders?: string[]
  }
}

export type ConfigModule = {
  exports?: ConfigFile
}
