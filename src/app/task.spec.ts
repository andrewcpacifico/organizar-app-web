import {Task} from './task';

describe('Task', () => {
  it('should create an instance', () => {
    const t = new Task(0, 'A task', 'A task desc', 'task-icon');
    expect(t).toBeTruthy();
  });
});
