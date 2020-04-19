import { desktopValidators } from './desktop.validators'
import { DesktopManager } from '../desktop-managers/desktop-manager.interface'
import { DesktopManagers } from '../desktop-managers'

export class DesktopManagerFactory {
  private getDesktopManagerKey(): string {
    const desktop = desktopValidators.find(desktopValidator => desktopValidator.isAvailable())
    if (!desktop) {
      throw new Error('Desktop Enviroment not supported.')
    }

    console.log(`Using configuration for ${desktop.name} desktop enviroment.`)

    return desktop.name
  }

  getCurrentDesktopManager(): DesktopManager {
    const desktopManagerKey = this.getDesktopManagerKey()

    return new DesktopManagers[desktopManagerKey]()
  }
}
