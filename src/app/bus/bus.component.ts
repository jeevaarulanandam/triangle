import { Component, OnInit } from '@angular/core';
import { GoibiboApiService } from '../services/goibiboApi.service';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { startWith } from 'rxjs/operators/startWith';
import { CitiesService } from '../services/cities.service';
import { map } from 'rxjs/operators/map';
import * as moment from 'moment';

@Component({
  selector: 'app-bus',
  templateUrl: './bus.component.html',
  styleUrls: ['./bus.component.css'],
  providers: [GoibiboApiService,CitiesService]
})
export class BusComponent implements OnInit {
  oneWaysBusList: any;
  trip: any;
  fromCityControl: FormControl = new FormControl();
  toCityControl: FormControl = new FormControl();

  fromFilteredOptions: Observable<string[]>;
  toFilteredOptions: Observable<string[]>;
 
  options = this.cities.getBus();
  options1 = this.cities.getBus();

  constructor(private goibiboApiService: GoibiboApiService,
              private cities:CitiesService) {
    this.trip = {
      type: 'oneWayTrip'
    }
  }

  searchBus() {

    this.trip.formatDepartDate = moment(this.trip.departDate).format('YYYYMMDD');
    this.trip.formatReturnDate = moment(this.trip.returnDate).format('YYYYMMDD');

    this.goibiboApiService.searchBus(this.trip).subscribe(data => {
      this.oneWaysBusList = data.onwardflights;
      console.log(data.onwardflights);

    }, error => {
      console.log(error);
    }, () => {
      console.log('Sucessfully Added');

    });
  }

  ngOnInit() {
      this.toFilteredOptions = this.toCityControl.valueChanges.pipe(startWith(''),
        map(val => this.filter(val))
      );

      this.fromFilteredOptions = this.fromCityControl.valueChanges.pipe(startWith(''),
      map(val => this.filter(val))
    );
  }

  filter(val: string): string[] {
    return this.options.filter(option =>
      option.toLowerCase().indexOf(val.toLowerCase()) === 0);
  }

}

