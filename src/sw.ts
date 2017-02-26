import { TaskLoaders } from './loaders';
import { Task } from './models';

const loaders = new TaskLoaders();

self.addEventListener("install", (event) => {
    console.log(loaders.queue.getCount());
});

self.addEventListener("message", (event) => {
    console.log(event);

    const task: Task = event.data;

    loaders.queue.enqueue(task);

    loaders.store[task.query] = [];

    loaders.processNext();
});