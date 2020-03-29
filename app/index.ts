import { spawn } from 'child_process'
import * as fs from 'fs'
import * as path from 'path'
import * as cron from 'cron'

const CronJob = cron.CronJob

const folder = '/home/dantehemerson/Pictures/wallpapers'

const supportedExts = ['.png', '.jpg', '.jpeg']

function filterPathsByExtension(directory: string, extensions: string[] = supportedExts) {
  const files = fs.readdirSync(directory)
  return files.filter(file => extensions.includes(path.extname(file)))
}

function getFullFilePath(folder: string, filePath: string) {
  return `file://${path.join(folder, filePath)}`
}

function setWallpaper(filePath: string) {
  spawn('gsettings', ['set', 'org.gnome.desktop.background', 'picture-uri', filePath])
}

const wallpapers = filterPathsByExtension(folder)

function getRandomWallpaper(folder, wallpapers: string[]) {
  const index = Math.floor(Math.random() * wallpapers.length)

  return getFullFilePath(folder, wallpapers[index])
}

console.log('Dante: wallpapers', wallpapers)

const changeWallpaperJob = new CronJob('0 */1 * * * *', () => {
  setWallpaper(getRandomWallpaper(folder, wallpapers))
})

changeWallpaperJob.start()
// const commands = [, ]

process.on('SIGINT', () => {
  changeWallpaperJob.stop()
  process.exit()
})
