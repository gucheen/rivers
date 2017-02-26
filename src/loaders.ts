import { Task } from './models';
import { Queue } from './queue';
import { Quries } from './quries';

export interface Loaders {
    queue: Queue;
    idle: boolean;
    currentTask: Task;

    loadData(task: Task): any;
    processNext(): void;
    addTask(task: Task): void;
}

/**
 * TaskLoaders is the main class of this service worker.
 */
export class TaskLoaders implements Loaders {
    /**
     * Tasks are stored in 'queue'.
     */
    queue = new Queue();
    idle = true;
    idleTask = {
        query: 'idle',
        filename: '',
    };
    currentTask = this.idleTask;

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
    loadData(task: Task): Promise<any> {
        const queryFunc = Quries[task.query];
        return queryFunc({
            limit: 100,
            offset: 0,
        });
    }

    processNext() {
        if (this.queue.getCount() === 0) {
            console.log('Queue empty, all tasks were finished');
            return;
        }
        if (!this.idle) {
            console.log(`Current proessing task: ${this.currentTask.query}`);
            return;
        }
        const task = this.queue.dequeue();
        this.idle = false;
        this.currentTask = task;
        const data = this.loadData(task)
            .then(() => {
                this.store[task.query].push(data);
                this.idle = true;
                this.currentTask = this.idleTask;
                if (this.queue.getCount()) {
                    this.processNext();
                } else {
                    console.log('All tasks in queue have been finished');
                    console.log(this.store);
                }
            });
    }

    addTask(task: Task) {
        this.queue.enqueue(task);
        this.store[task.query] = [];
        
        if (this.idle && this.queue.getCount()) {
            this.processNext();
        }
    }
}