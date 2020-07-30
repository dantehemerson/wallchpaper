import { CronJob } from 'cron'
import { Config } from './config/config'
import { WallpaperManager } from './wallpaper.manager'
import { DesktopManager } from './desktop-managers/desktop-manager'

export class App {
  private readonly changeWallpaperJob: CronJob

  constructor(
    private readonly config: Config,
    private readonly desktopManager: DesktopManager,
    private readonly wallpaperManager: WallpaperManager
  ) {
    this.changeWallpaperJob = new CronJob(this.config.getConfig().time, this.changeSystemWallpaper.bind(this))
  }

  private changeSystemWallpaper() {
    const wallpaperPath = this.wallpaperManager.next()
    this.desktopManager.setWallpaper(wallpaperPath)
  }

  start() {
    this.changeWallpaperJob.start()
  }

  // destructor
  finish() {
    this.changeWallpaperJob.stop()
  }
}
