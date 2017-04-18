import { TestBed, inject } from '@angular/core/testing';

import { Task } from './task';
import { TaskService } from './task.service';

describe('TaskService', () => {
  let service;

  beforeEach(() => {
    service = new TaskService();
  });

  it('getTasks(): should resolve with an array of tasks', (done) => {
    service.getTasks().then((tasks) => {
      expect(tasks instanceof Array).toBeTruthy();
      done();
    });
  });
});
