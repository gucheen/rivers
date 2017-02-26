import { Task } from './models';
import { Queue } from './queue';
import { Quries } from './quries';

export interface Loaders {
    queue: Queue;

    loadData(task: Task): any;
    processNext(): void;
}

/**
 * TaskLoaders is the main class of this service worker.
 */
export class TaskLoaders implements Loaders {
    /**
     * Tasks are stored in 'queue'.
     */
    queue = new Queue();

    /**
     * All data are stored in 'store'.
     */
    store: { [key: string]: any[] } = {};

    constructor() {
    }

    /**
     * Call target query function of task.
     * Currently all query functions are defined in 'quires.ts'.
     */
    loadData(task: Task) {
        const queryFunc = Quries[task.query];
        return queryFunc({
            limit: 100,
            offset: 0,
        });
    }

    async processNext() {
        const task = this.queue.dequeue();
        const data = await this.loadData(task);
        this.store[task.query].push(data);
        console.log(this.store);
    }
}