import { TestBed, async } from '@angular/core/testing';
import { spy, stub } from 'sinon';

import { AppComponent } from './app.component';
import { AppModule } from './app.module';
import { Task } from './task';
import { TaskService } from './task.service';

describe('AppComponent', () => {
  let taskServiceStub;
  let fixture;
  let component;
  let taskService: TaskService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        AppModule
      ],
    })
    .overrideComponent(AppComponent, {
      set: {
        providers: [
          TaskService
        ],
      }
    })
    .compileComponents();

    taskServiceStub = {
      getTasks: function() {
        return [
          new Task(0, 'A task 0', 'A task desc', 'task-icon'),
          new Task(1, 'A task 1', 'A task desc', 'task-icon'),
          new Task(2, 'A task 2', 'A task desc', 'task-icon'),
          new Task(3, 'A task 3', 'A task desc', 'task-icon'),
        ];
      }
    };

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.debugElement.componentInstance;
    taskService = fixture.debugElement.injector.get(TaskService);
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should call service to get tasks', () => {
    const getTasksStub = stub(taskService, 'getTasks')
      .resolves([]);
    fixture.detectChanges();

    expect(getTasksStub.calledOnce).toBeTruthy();
  });
});
