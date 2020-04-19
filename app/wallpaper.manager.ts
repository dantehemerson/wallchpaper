import path from 'path'
import fs from 'fs'
import { flatArray, shuffleArray } from './utils/array'
import { ConfigApp } from './config/config.types'

const supportedExtensions = ['.png', '.jpg', '.jpeg']

// If length of wallpapers is less than this then load more
const whereReload = 10

export class WallpaperManager {
  private wallpaperPaths: string[] // urls

  constructor(private readonly config: ConfigApp) {
    this.wallpaperPaths = []
    this.config = config

    this.loadFromFolders()
  }

  private loadFilePathsFromFolders(): string[] {
    return flatArray<string>(
      this.config.folders.map(folderPath => {
        const files = fs.readdirSync(folderPath)
        return files
          .filter(file => supportedExtensions.includes(path.extname(file)))
          .map(file => this.parsePath(folderPath, file))
      })
    )
  }

  loadFromFolders() {
    const filePaths = this.loadFilePathsFromFolders()
    this.wallpaperPaths.push(...shuffleArray(filePaths))
  }

  reaload() {
    const filePaths = this.loadFilePathsFromFolders()
    this.wallpaperPaths = filePaths
  }

  next(): string {
    const wallpaperPath = this.wallpaperPaths.shift()

    if (this.wallpaperPaths.length < whereReload) {
      this.loadFromFolders()
    }

    return wallpaperPath
  }

  private parsePath(folder, filePath) {
    return `file://${path.join(folder, filePath)}`
  }
}
