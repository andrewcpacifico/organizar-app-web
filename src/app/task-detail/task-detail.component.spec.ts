import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppModule } from '../app.module';
import { Task } from '../task';
import { TaskDetailComponent } from './task-detail.component';

describe('TaskDetailComponent', () => {
  let component: TaskDetailComponent;
  let fixture: ComponentFixture<TaskDetailComponent>;
  let task: Task;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [AppModule],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskDetailComponent);
    component = fixture.componentInstance;

    task = new Task(0, 'A task', 'A task desc', 'task_icon');
    component.task = task;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render task title inside .header node', async(() => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.header').textContent).toContain(task.title);
  }));

  it('should render task id inside .taskId node', async(() => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.taskId').textContent).toContain(task.id);
  }));
});
