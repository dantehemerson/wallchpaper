import cron from 'cron'
import { Config } from './config/config'
import { System } from './system'
import { WallpaperManager } from './wallpaper.manager'

const CronJob = cron.CronJob

const system = new System()
const config = new Config()
config.setup()

const wallpaperManager = new WallpaperManager(config.getConfig())

console.log('La configuracion es', config.getConfig())

const changeWallpaperJob = new CronJob(config.getConfig().time, () => {
  const wallpaperPath = wallpaperManager.next()
  console.log('Dante: wallpaperPath', wallpaperPath)
  system.setWallpaper(wallpaperPath)
})

changeWallpaperJob.start()

process.on('SIGINT', () => {
  changeWallpaperJob.stop()
  process.exit()
})
