import {exec} from 'child_process';
import {promisify} from 'util'

const promiseExec = promisify(exec);

export default class FCBuilder {
  constructor(private cwd: string) {}

  async build() {
    try {
      await promiseExec('yarn', {
        cwd: this.cwd
      })
      const result = await promiseExec('tsc', {
        cwd: this.cwd
      })
      console.log(result)
    } catch (error) {
      console.log(error)
    }

  }
}