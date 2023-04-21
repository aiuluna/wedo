import { Topic } from "@wedo/meta";
import { Emitter } from "@wedo/utils";
import { useEffect } from "react";
import { Subscription } from "rxjs";

type SubscribeGroup = [emitter: Emitter<Topic>, topic: Topic | Topic[]]

// 两种类型 [[emitter, []]], [emitter, []]
function isGroupArray (groups: SubscribeGroup | SubscribeGroup []): groups is SubscribeGroup[] {
  return !(groups[0] as any).emit
}

const useSubscribe = (group: SubscribeGroup | SubscribeGroup[], callback: (...args: Array<any>) => any ) => {
  
  function createSub(sub: SubscribeGroup): Subscription {
    const [emitter, topic] = sub;
    return emitter.on(topic).subscribe(callback)
  }

  useEffect(() => {
    const subs: Array<Subscription> = [];
    if (isGroupArray(group)) {
      group.forEach(g => {
        subs.push(createSub(g))
      })
    } else {
      subs.push(createSub(group))
    }

    return subs.forEach(s => s.unsubscribe())
  }, [])
}

export default useSubscribe;