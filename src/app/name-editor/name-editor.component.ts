import { Component, OnInit } from '@angular/core';
import { FormControl } from '../../../node_modules/@angular/forms';
import { Person } from '../person';
import { IAlert } from '../alert';

@Component({
  selector: 'app-name-editor',
  templateUrl: './name-editor.component.html',
  styleUrls: ['./name-editor.component.scss']
})
export class NameEditorComponent implements OnInit {
  names: string[];
  model = new Person();
  luckyPerson: any;
  luckyPeople = [];
  temporary = [];
  alerts: IAlert[];

  constructor() { }

  ngOnInit() {
    this.names = [];
    this.alerts = [];
  }

  addName() {
    if (this.names.length > 0 && !this.names.includes(this.model.name) && this.model.name !== undefined) {
      this.names.push(this.model.name);
    } else if (this.names.length === 0 && this.model.name !== undefined) {
      this.names.push(this.model.name);
    }
    this.temporary = this.names;
  }

  remove(index: any) {
    this.names = this.names.filter((name) => name !== this.names[index]);
    this.temporary = this.names;
  }

  getLucky() {
    const luckyNumber = Math.floor((Math.random() * this.temporary.length));
    if (!this.luckyPeople.includes(this.temporary[luckyNumber])) {
    this.luckyPerson = this.temporary[luckyNumber];
    this.temporary = this.temporary.filter((temp) => temp !== this.luckyPerson);
    }
    if (this.temporary.length === 0 && this.alerts.length === 0) {
      this.alerts.push({
        type: 'success',
        message: 'All people are completed',
      });
    }
  }

  close(alert: IAlert) {
    this.alerts.splice(this.alerts.indexOf(alert), 1);
  }

  reset() {
    this.temporary = this.names;
    this.alerts = [];
    this.luckyPerson = undefined;
  }
}
