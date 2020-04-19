import { DesktopManager } from './desktop-manager.interface'
import { execFileSync } from 'child_process'

export class CinnamonDesktopManager implements DesktopManager {
  setWallpaper(filePath: string) {
    const args = ['set', 'org.cinnamon.desktop.background', 'picture-uri']
    execFileSync('gsettings', [...args, filePath])
  }
}
