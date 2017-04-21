import { TestBed, async, fakeAsync, tick, ComponentFixture } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { spy, stub } from 'sinon';

import { AppComponent } from './app.component';
import { AppModule } from './app.module';
import { Task } from './task';
import { TaskService } from './task.service';

describe('AppComponent', () => {
  const returnedTasks: Task[] = [
    new Task(0, 'A task 0', 'A task desc', 'task-icon'),
    new Task(1, 'A task 1', 'A task desc', 'task-icon'),
    new Task(2, 'A task 2', 'A task desc', 'task-icon'),
    new Task(3, 'A task 3', 'A task desc', 'task-icon'),
  ];
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;
  let taskService: TaskService;
  let getTasksStub;

  beforeEach(async(() => {
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
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.debugElement.componentInstance;
    taskService = fixture.debugElement.injector.get(TaskService);
  });

  afterEach(() => {
    if (getTasksStub) {
      getTasksStub.restore();
    }
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should call service to get tasks', () => {
    getTasksStub = stub(taskService, 'getTasks')
      .resolves([]);
    fixture.detectChanges();

    expect(getTasksStub.calledOnce).toBeTruthy();
  });

  it('should render tasks returned by service', fakeAsync(() => {
    const compiled: Element = fixture.debugElement.nativeElement;
    getTasksStub = stub(taskService, 'getTasks')
      .resolves(returnedTasks);

    fixture.detectChanges();
    tick();
    fixture.detectChanges();

    const listItems: NodeList = compiled.querySelectorAll('md-list-item');
    expect(listItems.length).toEqual(returnedTasks.length);

    for (let i = 0; i < listItems.length; ++i) {
      const item: Element = <Element>listItems[i];
      const task: Task = returnedTasks[i];
      const iconNode: Element = item.querySelector('md-icon');
      const titleNode: Element = item.querySelector('.task-title');
      const descNode: Element = item.querySelector('.task-description');

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
    getTasksStub = stub(taskService, 'getTasks')
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

  it ('should select the clicked task', fakeAsync(() => {
    const compiled: Element = fixture.debugElement.nativeElement;
    getTasksStub = stub(taskService, 'getTasks')
      .resolves(returnedTasks);

    fixture.detectChanges();
    tick();
    fixture.detectChanges();

    const listItems = fixture.debugElement.queryAll(By.css('md-list-item'));
    const item = listItems[2];

    item.triggerEventHandler('click', null);
    expect(component.selectedTask).toBe(returnedTasks[2]);
  }));
});
