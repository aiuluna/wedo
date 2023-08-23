import { exec } from 'child_process'
import { promisify } from 'util'
import fs from 'fs'
import path from 'path'
import { CodeProjectFS } from './CodeProjectFS';
import { codeProjectRemote, fileRemote } from '@wedo/request'

const execPromise = promisify(exec);

export class CodeRunner {
  constructor(private cwd: string, private user: string, private project: string) {
  }

  private loadProjectStatus(): { lastBuild: number } {
    try {
      return JSON.parse(fs.readFileSync(path.resolve(this.cwd, '.project'), 'utf-8'))
    } catch (error) {
      return { lastBuild: 0 }
    }
  }


  private async prepare(): Promise<'skip' | 'reload'> {
    const { lastBuild } = this.loadProjectStatus();
    const result = await codeProjectRemote.get(this.user, this.project);

    if (!result.success) {
      throw new Error(result.message)
    }

    // 线上版本小于本地之前build的版本，不需要更新
    console.log('result.data', result.data)
    
    const version = result.data.version;
    console.log('version', version, lastBuild, version <= lastBuild)
    if (version <= lastBuild) return 'skip'

    if (fs.existsSync(this.cwd)) {
      fs.rmSync(this.cwd, {
        recursive: true,
        force: true
      })
    }
    fs.mkdirSync(this.cwd)
    return 'reload'
  }

  private async build() {
    const projectFS = new CodeProjectFS(this.cwd);
    const project = await projectFS.download(this.user, this.project);
    execPromise('yarn', {
      cwd: this.cwd
    })

    const lastSuccessBuild = project.getVersion()
    fs.writeFileSync(
      path.resolve(this.cwd, '.project'),
      JSON.stringify({lastBuild: lastSuccessBuild}),
      'utf-8'
    )
  }

  public async run(fnName: string, ...args: any[]) {
    const indexModulePath = path.resolve(this.cwd, './build/index.js')

    const prepareResult = await this.prepare();
    switch (prepareResult) {
      case 'skip':
        console.log('skip')
        break;
      case 'reload':
        console.log('reload')
        delete require.cache[indexModulePath]
        await this.build();
        break;
    }
    const module = require(indexModulePath)
    const fn = module[fnName]
    if (!fn) {
      throw new Error(`fn ${fnName} is not a function`)
    }
    return await fn(...args)
  }
}