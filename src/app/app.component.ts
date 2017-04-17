import { Component, OnInit } from '@angular/core';

import { TaskService } from './task.service';
import { Task } from './task';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],

  providers: [TaskService],
})
export class AppComponent implements OnInit {
  title = 'Organizar - Life Manager!';
  tasks: Task[];
  selectedTask: Task;

  constructor(private taskService: TaskService) {}

  onSelect(task: Task): void {
    this.selectedTask = task;
  }

  getTasks(): void {
    this.taskService.getTaks().then((tasks) => {
      this.tasks = tasks;
    });
  }

  ngOnInit(): void {
    this.getTasks();
  }
}
