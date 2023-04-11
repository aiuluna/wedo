export class KeyValueCache<T> {
  data: Record<string, T>;

  constructor() {
    this.data = {}
  }

  public set(key: string, value: T) {
    this.data[key] = value
  }

  public get(key: string): T | null {
    return this.data[key] || null
  }
}