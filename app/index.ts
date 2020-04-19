#!/usr/bin/env node

import { Config } from './config/config'
import { System } from './system'
import { WallpaperManager } from './manager/wallpaper.manager'
import { App } from './app'

const system = new System()
const config = new Config()

config.setup()

const wallpaperManager = new WallpaperManager(config.getConfig())

const app = new App(config, system, wallpaperManager)

app.start()

process.on('SIGINT', () => {
  app.finish()
})
