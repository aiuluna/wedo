type SubscribeFunc = (data: any) => void

export class PubSub<Topic extends string | number | symbol> {
  private events: Map<string | number | symbol, SubscribeFunc[]>

  constructor() {
    this.events = new Map();
  }

  // 订阅方法
  public subscribe(topic: Topic, fn: SubscribeFunc) {
    if (!this.events.has(topic)) {
      this.events.set(topic, []);
    }
    this.events.get(topic)?.push(fn)
  }

  // 发布方法
  public publish(topic: Topic, data?: any) {
    if (this.events.has(topic)) {
      this.events.get(topic)?.forEach(fn => {
        fn(data)
      })
    }
  }

  // 删除指定任务
  public unsubscribe(topic: Topic, fn: SubscribeFunc) {
    if (this.events.has(topic)) {
      const idx = this.events.get(topic)?.findIndex(cb => cb === fn) || -1;
      if (idx > -1) {
        this.events.get(topic)?.splice(idx, 1)
      }
      if (!this.events.get(topic)?.length) {
        this.events.delete(topic)
      }
    }
  }

  // 删除topic下所有任务
  public unsubscribeAll(topic: Topic) {
    if (this.events.has(topic)) {
      this.events.delete(topic)
    }
  }
}

