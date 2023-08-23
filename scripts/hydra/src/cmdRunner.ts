import { exec, ExecOptions } from 'child_process'
import chalk from 'chalk'

export async function runCmd(cmd: string, options?: ExecOptions, silent = false) {
  return new Promise((resolve, reject) => {
    try {
      const proc = exec(cmd, options)
      proc.stdout?.on('data', (data) => {
        console.log(chalk.green(data))
      })
      proc.stderr?.on('error', (error) => {
        console.error(chalk.red(error))
      })
      proc.on('close', () => {
        resolve(true)
      })
    } catch (error: any) {
      if (silent) {
        console.log(error.message)
        resolve(true)
        return
      }
      reject(error)
    }
  })
}