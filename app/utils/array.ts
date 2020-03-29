import { deepClone } from './shared'

export function shuffleArray<T = any>(_arreglo: T[]) {
  const arreglo = deepClone<T[]>(_arreglo)

  for (let i = arreglo.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    const temp = arreglo[i]
    arreglo[i] = arreglo[j]
    arreglo[j] = temp
  }

  return arreglo
}

export function flatArray<T>(arreglo: T[][]): T[] {
  return arreglo.reduce((accumulator, item) => accumulator.concat(item), [])
}
