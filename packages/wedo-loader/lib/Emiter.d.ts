import { Observable } from 'rxjs';
export declare class Emitter<Topic extends string | number | symbol> {
    private observers;
    constructor();
    private addObserverFunction;
    on(topic: Topic | Topic[]): Observable<any>;
    emit(topic: Topic, data?: any): void;
}
