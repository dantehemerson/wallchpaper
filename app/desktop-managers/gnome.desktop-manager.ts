import { DesktopManager } from './desktop-manager.interface'
import { execFileSync } from 'child_process'

export class GnomeDesktopManager implements DesktopManager {
  setWallpaper(filePath: string) {
    const args = ['set', 'org.gnome.desktop.background', 'picture-uri']
    execFileSync('gsettings', [...args, filePath])
  }
}
