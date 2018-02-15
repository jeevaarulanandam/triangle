import { Component, OnInit } from '@angular/core';
import { GoibiboApiService } from '../services/goibiboApi.service';



@Component({
  selector: 'app-bus',
  templateUrl: './bus.component.html',
  styleUrls: ['./bus.component.css'],
  providers: [GoibiboApiService]
})
export class BusComponent implements OnInit {









oneWaysBusList: any;
trip:any;





constructor(private goibiboApiService: GoibiboApiService) {
    this.trip ={
      type:'oneWayTrip'
    }
}

searchBus() {
console.log(this.trip);
  this.goibiboApiService.searchBus(this.trip).subscribe(data => {
   
    this.oneWaysBusList = data.onwardflights;

    console.log(data);

    
    
  }, error => {
    console.log(error);
  }, () => {
    console.log('Sucessfully Added');
    
  });
 
}









  ngOnInit() {
  }

}

