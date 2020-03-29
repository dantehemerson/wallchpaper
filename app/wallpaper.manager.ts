import path from 'path'
import fs from 'fs'
import { flatArray, shuffleArray } from './utils/array'
import { ConfigApp } from './config/config.types'

const supportedExtensions = ['.png', '.jpg', '.jpeg']

export class WallpaperManager {
  private wallpaperPaths: string[] // urls
  private config: ConfigApp

  constructor(config: ConfigApp) {
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
    return this.wallpaperPaths.shift()
  }

  private parsePath(folder, filePath) {
    return `file://${path.join(folder, filePath)}`
  }
}
