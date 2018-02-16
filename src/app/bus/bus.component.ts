import { Component, OnInit } from '@angular/core';
import { GoibiboApiService } from '../services/goibiboApi.service';
import * as moment from 'moment';

@Component({
  selector: 'app-bus',
  templateUrl: './bus.component.html',
  styleUrls: ['./bus.component.css'],
  providers: [GoibiboApiService]
})
export class BusComponent implements OnInit {
  //Declarations
  oneWaysBusList: any;
  trip: any;
 
  //Constractor
  constructor(private goibiboApiService: GoibiboApiService) {
    this.trip = {
      type: 'oneWayTrip'
    }
  }
  
  //Search Bus Query
  searchBus() {
    
    this.trip.departDate = moment(this.trip.departDate).format('YYYYMMDD');
    this.trip.returnDate = moment(this.trip.returnDate).format('YYYYMMDD');

    this.goibiboApiService.searchBus(this.trip).subscribe(data => {
      this.oneWaysBusList = data.onwardflights;
      
    }, error => {
      console.log(error);
    }, () => {
      console.log('Sucessfully Added');

    });
}

ngOnInit() {
  }

}

