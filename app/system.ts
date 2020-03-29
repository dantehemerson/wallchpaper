import { spawn } from 'child_process'

export class System {
  private command: string
  private arguments: string[]

  constructor() {
    this.command = 'gsettings'
    this.arguments = ['set', 'org.gnome.desktop.background', 'picture-uri']
  }

  setWallpaper(filePath: string) {
    spawn(this.command, [...this.arguments, filePath])
  }
}
