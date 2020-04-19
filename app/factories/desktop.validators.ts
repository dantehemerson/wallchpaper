import { commandExists, hasLine } from '../utils/shared'
import { execFileSync } from 'child_process'

type DesktopValidator = {
  name: string
  isAvailable: () => boolean
}

export const desktopValidators: DesktopValidator[] = [
  {
    name: 'cinnamon',
    isAvailable: () => {
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
  },
  {
    name: 'gnome',
    isAvailable: () => commandExists('gsettings')
  }
]
