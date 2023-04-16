export class Logger {
    topic;
    constructor(topic) {
        this.topic = `[${topic}] `;
    }
    debug(...args) {
        console.debug(this.topic, ...args);
    }
    log(...args) {
        console.log(this.topic, ...args);
    }
}
