import { Emitter } from './Emitter';
class StateMachine extends Emitter {
    state;
    transferTable;
    constructor(initialState) {
        super();
        this.state = initialState;
        this.transferTable = new Map();
    }
    addTransferTable(from, to, action, fn) {
        if (!this.transferTable.has(from)) {
            this.transferTable.set(from, new Map());
        }
        this.transferTable.get(from)?.set(action, [fn, to]);
    }
    register(from, to, action, fn) {
        if (Array.isArray(from)) {
            from.forEach(_from => {
                this.addTransferTable(_from, to, action, fn);
            });
            return;
        }
        this.addTransferTable(from, to, action, fn);
    }
    describe(desc, callback) {
        callback(this.register.bind(this));
    }
    dispatch(action, ...data) {
        const actionMap = this.transferTable.get(this.state);
        const transfer = actionMap?.get(action);
        if (!transfer)
            return false;
        const [fn, nextS] = transfer;
        fn(...data);
        this.state = nextS;
        // 每个阶段如果注册有要自动处理的事件，则执行
        while (this.dispatch('<auto>', ...data))
            ;
        return true;
    }
    underState(s) {
        return this.state === s;
    }
    getState() {
        return this.state;
    }
}
export { StateMachine };
