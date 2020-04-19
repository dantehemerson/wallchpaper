import { execFileSync } from 'child_process'

export function deepClone<T>(value: T): T {
  return JSON.parse(JSON.stringify(value))
}

export function commandExists(command: string): boolean {
  try {
    let stdout = execFileSync('which', ['-a', command]).toString()
    stdout = stdout.trim()

    if (!stdout) {
      return false
    }

    return true
  } catch {
    return false
  }
}

export function hasLine(string, lineToFind) {
  return string.split('\n').find(line => line.trim() === lineToFind)
}
