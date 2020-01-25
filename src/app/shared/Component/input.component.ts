import { Component, OnInit, AfterViewInit, Input } from '@angular/core';
import { Schema } from '../Model/table.model';

@Component({
  selector: 'app-input',
  template:
  `<mat-form-field>
  <input matInput placeholder={{schema.column}} [(ngModel)]="schema.value">
  </mat-form-field>
  <br/>`
})
export class InputComponent implements OnInit {

  schema: Schema;

  constructor() {}

  ngOnInit() {}
}