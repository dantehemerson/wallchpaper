#!/usr/bin/env node

import { Config } from './config/config'
import { WallpaperManager } from './wallpaper.manager'
import { App } from './app'
import { DesktopManagerFactory } from './factories/desktop-manager.factory'
import { DesktopManager } from './desktop-managers/desktop-manager'

function main() {
  const config = new Config()
  config.setup()

  const wallpaperManager = new WallpaperManager(config.getConfig())

  const desktopManagerFactory = new DesktopManagerFactory()
  const desktopManager: DesktopManager = desktopManagerFactory.getCurrentDesktopManager()

  const app = new App(config, desktopManager, wallpaperManager)

  app.start()

  process.on('SIGINT', () => {
    app.finish()
    process.exit()
  })
}

main()
