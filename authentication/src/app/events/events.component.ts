import { EventService } from './../event.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {
  events = [];
  constructor(private _eventService: EventService) { }

  ngOnInit() {
    this._eventService.getEvents()
    .subscribe(
      err => console.log(err)
    );
  }

}
