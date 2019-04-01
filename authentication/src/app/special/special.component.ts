import { Router, ActivatedRoute } from '@angular/router';
import { EventService } from './../event.service';
import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-special',
  templateUrl: './special.component.html',
  styleUrls: ['./special.component.css']
})
export class SpecialComponent implements OnInit {
  events: Observable<Events[]>;
  editEvent: any;
  event: any;
  id = {'id': ''};
  constructor(private _eventService: EventService, private _router: Router, private _route: ActivatedRoute) { }

  ngOnInit() {
    this.getData();
  }

  getData() {
    this._eventService.getEvents().subscribe(res => {
      console.log(res);
      this.events = res;
      console.log(this.events);
    }, err => {
      console.log(err);
    });
  }

  insertData() {
    this._eventService.post(this.event).subscribe(res => {
      this.getData();
    }, err => {
      console.log(err);
    });
  }

  updateData() {
    this._eventService.update(this.editEvent).subscribe(res => {
      this.getData();
    }, err => {
      console.log(err);
    });
  }

  deleteData() {
    this._eventService.deleteEvent(this.id).subscribe(res => {
      this.getData();
    }, err => {
      console.log(err);
    });
  }

}

class Events {
  name: string;
  description: string;
}
