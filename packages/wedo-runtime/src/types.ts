import { WedoEventName } from "@wedo/meta"
import { WedoNodeProxy } from "./WedoNodeProxy"

export type WedoEvent = {
  type: WedoEventName,
  node: WedoNodeProxy
}

export type WedoEventHandler = (e?: WedoEvent) => void