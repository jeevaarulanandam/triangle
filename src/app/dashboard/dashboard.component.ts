import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { startWith } from 'rxjs/operators/startWith';
import { map } from 'rxjs/operators/map';
import { FormGroup, FormControl, FormBuilder, Validators, FormArray  } from '@angular/forms';





@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent{

movieLanguage: FormControl = new FormControl();

  languageList = [
    'Tamil',
    'English',
    'Malayalam',
    'Hindi',
    'Telugu'
  ];

  updateMovie(){
    
  }




  
 

}
