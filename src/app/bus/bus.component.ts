import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-bus',
  templateUrl: './bus.component.html',
  styleUrls: ['./bus.component.css']
})
export class BusComponent implements OnInit {
trip;
constructor() {
    this.trip ={
      type:'oneWayTrip'
    }
   }

  ngOnInit() {
  }

  searchBus() {
   
  }

}
