import { Emitter } from "./Emitter";

type StateTransferFunction = (...args: any) => void

class StateMachine<S extends string | number, A extends string | number, Topic extends string | number | symbol> extends Emitter<Topic> {
  private state: S;
  private transferTable: Map<S, Map<A, [StateTransferFunction, S]>>;

  constructor(initialState: S) {
    super()
    this.state = initialState;
    this.transferTable = new Map();
  }

  addTransferTable(from: S, to: S, action: A, fn: StateTransferFunction) {
    if (!this.transferTable.has(from)) {
      this.transferTable.set(from, new Map())
    }
    this.transferTable.get(from)?.set(action, [fn, to])
  }

  register(from: S | S[], to: S, action: A, fn: StateTransferFunction) {
    if (Array.isArray(from)) {
      from.forEach(_from => {
        this.addTransferTable(_from, to, action, fn)
      })
      return;
    }
    this.addTransferTable(from, to, action, fn)
  }

  dispatch(action: A, ...data: any) {
    const actionMap = this.transferTable.get(this.state);
    const transfer = actionMap?.get(action);
    if (!transfer) return false;
    const [fn, nextS] = transfer;
    fn(...data)
    this.state = nextS;

    while (this.dispatch('<auto>' as A, ...data));
    return true
  }
}

export default StateMachine;