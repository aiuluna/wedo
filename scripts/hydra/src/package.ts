import path from 'path'
import fs from 'fs'
import { runCmd } from './cmdRunner'
import TreeNode from '../object/TreeNode'
import { error, notice, hasCycle } from "./utils";

interface PackageJSON {
  name: string
  version: [number, number, number]
  main: string
  hydra?: {
    devLinks?: string[]
    type?: 'service' | 'app' | 'lib' | 'cli'
    port?: number
  }
  depenencies?: {
    [dep: string]: string
  }
  devDeependencies?: {
    [dep: string]: string
  }
}

export class Package {
  private json: PackageJSON
  private fullname: string
  private dir: string

  constructor(file: string, dir: string) {
    this.fullname = path.resolve(dir, file)
    this.dir = dir
    const _json = this.parseJSON(fs.readFileSync(this.fullname, 'utf-8'))
    if (_json.version) {
      _json.version = _json.version.split('.').map(Number)
    }
    this.json = _json
  }

  private parseJSON(str: string) {
    try {
      return JSON.parse(str)
    } catch (e) {
      console.error('parse json err @' + str)
      throw e
    }
  }

  public async npmInstall() {
    await this.exec('yarn')
  }

  public async reNpmInstall() {
    await this.npmClear()
    await this.npmInstall()
  }

  public async npmLink(map: Map<string, TreeNode<Package>>) {
    if (this.getDevLinks()) {
      let linkNames = ''
      for (let linkName of this.getDevLinks()) {
        await map.get(linkName)?.getVal().npmLink(map)
        linkName += ' ' + linkName;
      }
      notice(`${this.getName()}: npm link ${linkNames}`)
      await this.exec(`npm link ${linkNames}`)
    }
    notice(`${this.getName()}: npm link`)
    await this.exec(`npm link`)
  }

  public async runDev() {
    switch (this.getHydraType()) {
      case "service":
        if (!this.json.hydra.port) {
          error(`you should specify port number in your package.json with skedo.port=xxx.`)
          break
        }
        const script = path.resolve(__dirname, './start-service.js')
        await this.exec(`pm2 start --name ${this.getName()} --exp-backoff-restart-delay=10000 ${script}`, {
          silent: true,
          envs: {
            PORT: this.json.hydra.port + ''
          }
        })
        await this.exec('pm2 list')
        break;

      default:
        break;
    }
    // await this.exec('yarn dev')
  }

  public async npmClear() {
    await this.exec('rm -rf ./node_modules', {
      silent: true
    })
    await this.exec('rm -rf ./package-lock.json', {
      silent: true
    })
    await this.exec('rm -rf ./yarn.lock', {
      silent: true
    })
  }

  public async build() {
    await this.exec('yarn build')
  }

  public async serve() {
    await this.exec('yarn serve')
  }

  public getDir() {
    return this.dir
  }

  public getName() {
    return this.json.name
  }

  public isRunnable() {
    if (!this.getHydraType()) return false;
    return ["service", "app"].indexOf(this.getHydraType()!) !== -1
  }

  public getHydraType() {
    return this.json.hydra?.type
  }

  public getVersion() {
    return this.json.version
  }

  public getDevLinks() {
    return this.json.hydra?.devLinks || []
  }

  private async exec(cmd: string, options: { envs?: NodeJS.ProcessEnv, cwd?: string, silent?: boolean } = {}) {
    const { envs = {}, cwd = this.dir, silent = false } = options
    await runCmd(cmd, {
      env: {
        ...process.env,
        ...envs
      },
      cwd
    }, silent)
  }

}

