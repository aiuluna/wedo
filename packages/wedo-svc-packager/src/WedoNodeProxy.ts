import { Node, Topic, WedoEventName } from "@wedo/meta";
import { WedoEvent, WedoEventHandler } from "./types";

export class WedoNodeProxy {
  private events: Record<string, Array<WedoEventHandler>>
  constructor(private node: Node) {
    this.events = {}
    this.node.on(Topic.ExternalEventNotify).subscribe((evt: WedoEvent) => {
      if (this.events[evt.type]) {
        this.events[evt.type].forEach(h => h(evt))
      }
    })
  }

  on(key: WedoEventName, handler: WedoEventHandler) {
    if (!this.events[key]) {
      this.events[key] = []
    }
    this.events[key].push(handler)
    return () => {
      this.events[key] = this.events[key].filter(x => x !== handler)
    }
  }

  public memory(data: any) {
    this.node.memory(data)
  }
}