import { Component, OnInit } from '@angular/core';
import { GoibiboApiService } from '../services/goibiboApi.service';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import {startWith} from 'rxjs/operators/startWith';
import {map} from 'rxjs/operators/map';
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
  myControl: FormControl = new FormControl();

  filteredOptions: Observable<string[]>;
  options = [
    'One',
    'Two',
    'Three',
    'One1',
    'Two1',
    'Three1',
    'One2',
    'Two2',
    'Thre2e'
   ];
 
  //Constractor
  constructor(private goibiboApiService: GoibiboApiService) {
    this.trip = {
      type: 'oneWayTrip'
    }
  }
  
  //Search Bus Query
  searchBus() {
   
    this.trip.formatDepartDate = moment(this.trip.departDate).format('YYYYMMDD');
    this.trip.formatReturnDate = moment(this.trip.returnDate).format('YYYYMMDD');

    this.goibiboApiService.searchBus(this.trip).subscribe(data => {
      this.oneWaysBusList = data.onwardflights;
      
    }, error => {
      console.log(error);
    }, () => {
      console.log('Sucessfully Added');

    });
}

ngOnInit() {

  this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(val => this.filter(val))
      );
  }

  filter(val: string): string[] {
    return this.options.filter(option =>
      option.toLowerCase().indexOf(val.toLowerCase()) === 0);
  }

}

