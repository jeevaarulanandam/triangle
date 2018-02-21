import { Component, OnInit } from '@angular/core';
import { GoibiboApiService } from '../services/goibiboApi.service';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { startWith } from 'rxjs/operators/startWith';
import { map } from 'rxjs/operators/map';
import * as moment from 'moment';

@Component({
  selector: 'app-bus',
  templateUrl: './bus.component.html',
  styleUrls: ['./bus.component.css'],
  providers: [GoibiboApiService]
})
export class BusComponent implements OnInit {
  oneWaysBusList: any;
  trip: any;
  fromCityControl: FormControl = new FormControl();
  toCityControl: FormControl = new FormControl();

  fromFilteredOptions: Observable<string[]>;
  toFilteredOptions: Observable<string[]>;
 
  options = ['sivagangai','coimbatore','madurai'];

  constructor(private goibiboApiService: GoibiboApiService) {
    this.trip = {
      type: 'oneWayTrip'
    }
  }

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

    this.fromFilteredOptions = this.fromCityControl.valueChanges
      .pipe(
        startWith(''),
        map(val => this.filter(val))
      );

      this.toFilteredOptions = this.toCityControl.valueChanges
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

