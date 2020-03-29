import vm from 'vm'
import { notify } from '../notify'

function validateSyntax(config: string) {
  try {
    return new vm.Script(config, { filename: '.wallch.js', displayErrors: true })
  } catch (error) {
    notify(error)
  }
}

function importConfig() {}
