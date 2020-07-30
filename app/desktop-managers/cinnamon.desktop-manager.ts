import { execFileSync } from 'child_process'
import { commandExists, hasLine } from '../utils/shared'
import { DesktopManager } from './desktop-manager'

export class CinnamonDesktopManager extends DesktopManager {
  setWallpaper(filePath: string) {
    const args = ['set', 'org.cinnamon.desktop.background', 'picture-uri']
    execFileSync('gsettings', [...args, filePath])
  }

  static isAvailable() {
    if (!commandExists('gsettings')) {
      return false
    }

    try {
      const stdout = execFileSync('gsettings', ['list-schemas']).toString()
      return hasLine(stdout, 'org.cinnamon.desktop.background')
    } catch {
      return false
    }
  }
}
