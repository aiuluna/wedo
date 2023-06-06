import { Page, Topic } from '@wedo/meta'
import { WedoNodeProxy } from './WedoNodeProxy';
import { codeProjectRemote } from '@wedo/request'

export class WedoContext {
  constructor(private page: Page) {

    this.page.on(Topic.Initialize).subscribe(() => {})
  }


  public async faas(fnName: string, ...args: string[]) {
    return await codeProjectRemote.faas.get(localStorage['x-user'], this.page.name, fnName, ...args)
  }

  public select(name: string) {
    if (!name) return null;
    for (let p of this.page.getRoot().bfs()) {
      if (p.getPassProps().get('name') === name)
        return new WedoNodeProxy(p)
    }
    return null
  }
}