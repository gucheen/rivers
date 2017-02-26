import { TaskLoaders } from './loaders';
import { Task } from './models';

const loaders = new TaskLoaders();

self.addEventListener("install", (event) => {
    
});

self.addEventListener("message", (event) => {
    console.log(event);

    const task: Task = event.data;

    loaders.addTask(task);
});
