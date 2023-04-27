import { Emitter } from './Emitter';
type StateTransferFunction = (...args: any) => void;
type RegFuncType<S, A> = (form: S | S[], to: S, action: A, fn: StateTransferFunction) => void;
declare class StateMachine<S extends string | number, A extends string | number, Topic extends string | number | symbol> extends Emitter<Topic> {
    private state;
    private transferTable;
    constructor(initialState: S);
    private addTransferTable;
    register(from: S | S[], to: S, action: A, fn: StateTransferFunction): void;
    describe(desc: string, callback: ((fn: RegFuncType<S, A>) => void)): void;
    dispatch(action: A, ...data: any): boolean;
    underState(s: S): boolean;
    getState(): S;
}
export { StateMachine };
