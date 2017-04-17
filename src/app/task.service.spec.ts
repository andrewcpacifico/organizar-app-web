import { TestBed, inject } from '@angular/core/testing';

import { Task } from './task';
import { TaskService } from './task.service';

describe('TaskService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TaskService]
    });
  });

  it('getTasks(): should resolve with an array of tasks',
  inject([TaskService], (service: TaskService) => {
    service.getTaks().then((tasks) => {
      expect(tasks instanceof Array).toBeTruthy();
    });
  }));
});
