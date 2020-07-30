import { DesktopManager } from '../desktop-managers/desktop-manager'
import { DesktopManagers } from '../desktop-managers'

export class DesktopManagerFactory {
  getCurrentDesktopManager(): DesktopManager {
    const ValidDesktopManager = Object.values(DesktopManagers).find(desktopManager => desktopManager.isAvailable())

    if (!ValidDesktopManager) {
      throw new Error('Desktop Enviroment not supported.')
    }

    console.log(`Using configuration for ${ValidDesktopManager.name} desktop enviroment.`)

    return new ValidDesktopManager()
  }
}
