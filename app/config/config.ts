import { ConfigFile, ConfigApp } from './config.types'
import { importConfig } from './loader'

export class Config {
  private config: ConfigFile

  constructor() {
    this.config = {}
  }

  setup() {
    this.config = importConfig()
  }

  getConfig(): ConfigApp {
    return this.config.config
  }
}
