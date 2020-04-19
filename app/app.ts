import { CronJob } from 'cron'
import { Config } from './config/config'
import { System } from './system'
import { WallpaperManager } from './manager/wallpaper.manager'

export class App {
  private readonly changeWallpaperJob: CronJob

  constructor(
    private readonly config: Config,
    private readonly system: System,
    private readonly wallpaperManager: WallpaperManager
  ) {
    this.changeWallpaperJob = new CronJob(this.config.getConfig().time, this.changeSystemWallpaper.bind(this))
  }

  private changeSystemWallpaper() {
    const wallpaperPath = this.wallpaperManager.next()
    this.system.setWallpaper(wallpaperPath)
  }

  start() {
    this.changeWallpaperJob.start()
  }

  // destructor
  finish() {
    this.changeWallpaperJob.stop()
    process.exit()
  }
}
