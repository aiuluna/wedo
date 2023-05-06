type SubscribeFunc = (data: any) => void;
export declare class PubSub<Topic extends string | number | symbol> {
    private events;
    constructor();
    subscribe(topic: Topic, fn: SubscribeFunc): void;
    publish(topic: Topic, data?: any): void;
    unsubscribe(topic: Topic, fn: SubscribeFunc): void;
    unsubscribeAll(topic: Topic): void;
}
export {};
