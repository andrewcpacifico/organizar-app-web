import { TestBed, async, fakeAsync, tick } from '@angular/core/testing';
import { spy, stub } from 'sinon';

import { AppComponent } from './app.component';
import { AppModule } from './app.module';
import { Task } from './task';
import { TaskService } from './task.service';

describe('AppComponent', () => {
  let returnedTasks: Task[] = [
    new Task(0, 'A task 0', 'A task desc', 'task-icon'),
    new Task(1, 'A task 1', 'A task desc', 'task-icon'),
    new Task(2, 'A task 2', 'A task desc', 'task-icon'),
    new Task(3, 'A task 3', 'A task desc', 'task-icon'),
  ];
  let fixture;
  let component;
  let taskService;

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

  it('should render tasks returned by service', fakeAsync(() => {
    const compiled = fixture.debugElement.nativeElement;
    const getTasksStub = stub(taskService, 'getTasks')
      .resolves(returnedTasks);

    fixture.detectChanges();
    tick();
    fixture.detectChanges();

    const listItems: NodeList = compiled.querySelectorAll('md-list-item');
    expect(listItems.length).toEqual(returnedTasks.length);

    for (let i = 0; i < listItems.length; ++i) {
      let item = <Element>listItems[i];
      let task = returnedTasks[i];
      let iconNode = item.querySelector('md-icon');
      let titleNode = item.querySelector('.task-title');
      let descNode = item.querySelector('.task-description');

      expect(task.icon).toEqual(iconNode.textContent);
      expect(task.title).toEqual(titleNode.textContent);
      expect(task.description).toEqual(descNode.textContent);      
    }    
  }));

  it('should render a loading spinner while tasks are loading', 
  fakeAsync(() => {
    let promiseResolver;
    const promise = new Promise((resolve, reject) => {
      promiseResolver = resolve;
    });
    const compiled = fixture.debugElement.nativeElement;
    const getTasksStub = stub(taskService, 'getTasks')
      .returns(promise);

    fixture.detectChanges();

    let spinner = compiled.querySelector('md-spinner');
    expect(spinner).toBeTruthy();

    promiseResolver([]);
    tick();
    fixture.detectChanges();

    spinner = compiled.querySelector('md-spinner');
    expect(spinner).toBeFalsy();
  }));
});
