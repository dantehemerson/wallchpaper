import { execFileSync } from 'child_process'
import { commandExists } from '../utils/shared'
import { DesktopManager } from './desktop-manager'

export class GnomeDesktopManager extends DesktopManager {
  setWallpaper(filePath: string) {
    const args = ['set', 'org.gnome.desktop.background', 'picture-uri']
    execFileSync('gsettings', [...args, filePath])
  }

  static isAvailable() {
    return commandExists('gsettings')
  }
}
