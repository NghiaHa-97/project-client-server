import { Component, OnInit, ElementRef } from '@angular/core';
// import { DateAdapter } from '@angular/material';
import {FileService} from "./file.service";


declare const require: any;

declare const $: any;

@Component({
    selector: 'app-extendedforms-cmp',
    templateUrl: 'extendedforms.component.html',
    styles: [`md-calendar {
      width: 300px;
  }`]
})

export class ExtendedFormsComponent implements OnInit {
    simpleSlider = 40;
    doubleSlider = [20, 60];

    regularItems = ['Pizza', 'Pasta', 'Parmesan'];
    touch: boolean;

    selectedValue: string;
    currentCity: string[];

    selectTheme = 'primary';
    cities = [
      {value: 'paris-0', viewValue: 'Paris'},
      {value: 'miami-1', viewValue: 'Miami'},
      {value: 'bucharest-2', viewValue: 'Bucharest'},
      {value: 'new-york-3', viewValue: 'New York'},
      {value: 'london-4', viewValue: 'London'},
      {value: 'barcelona-5', viewValue: 'Barcelona'},
      {value: 'moscow-6', viewValue: 'Moscow'},
    ];


    fileImg:File=null;
    fileList:FileList=null;

    constructor(private fileService:FileService) {
    }

    ngOnInit() {}
        myFunc(val: any) {
          // code here
        }

    changeFileInput(event: any) {
        console.log(event.files);
        this.fileList=event.files
        //this.fileImg=event.files;
        this.fileService.upload(this.fileList[0]).subscribe(event=>{
            console.log(event);
        })
    }
}
