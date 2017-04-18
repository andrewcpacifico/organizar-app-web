import { Injectable } from '@angular/core';

import { Task } from './task';
import { TASKS } from './mock-tasks';

@Injectable()
export class TaskService {

  constructor() { }

  public getTasks(): Promise<Task[]> {
    return new Promise((resolve, reject) => {
      setTimeout(function() {
        resolve(TASKS);
      }, 3000);
    });
  }
}
