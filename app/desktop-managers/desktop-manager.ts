export abstract class DesktopManager {
  abstract setWallpaper(wallpaperPath: string)

  /** Implement this always in child class, defined as this because abstract not exists for static mehtods */
  static isAvailable(): boolean {
    return false
  }
}
