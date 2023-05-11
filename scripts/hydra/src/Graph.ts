export class ListNode<T> {
  val: T;
  next: ListNode<T>;

  constructor(val: T) {
    this.val = val;
    this.next = null;
  }
}

export class LinkedList<T> {
  private head: ListNode<T>

  add(val: T) {
    if (!this.head) {
      this.head = new ListNode<T>(val)
      return
    }

    let cur: ListNode<T> = this.head;
    while (cur.next) {
      cur = cur.next;
    }
    cur.next = new ListNode<T>(val)
  }

  *find(): Generator<ListNode<T>> {
    if (!this.head) {
      return;
    }
    let cur = this.head;
    yield cur;
    while (cur.next) {
      cur = cur.next
      yield cur
    }
  }
}

export default class Graph<T> {
  private total: number;
  private adj: Map<T, LinkedList<T>>

  constructor(values: Array<T>) {
    this.total = values.length;
    this.adj = new Map();
    for (let item of values) {
      this.adj.set(item, new LinkedList())
    }
  }
  /**
   * s先于t, 边 s -> t
   * @param s 
   * @param t 
   */
  public addEdge(s: T, t: T): void {
    this.adj.get(s).add(t)
  }

  public getTotal() {
    return this.total
  }

  public getAdj() {
    return this.adj
  }
}