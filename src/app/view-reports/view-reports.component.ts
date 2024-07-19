import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FullCalendarModule } from '@fullcalendar/angular';
import { Calendar, CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import { CalendarCommonModule, CalendarEvent } from 'angular-calendar';
// npm install @fullcalendar/angular @fullcalendar/core @fullcalendar/daygrid
//https://fullcalendar.io/docs/angular
// npm install @canvasjs/angular-charts
// https://canvasjs.com/angular-charts/bar-chart-category-axis/
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';


@Component({
  selector: 'app-view-reports',
  standalone: true,
  imports: [RouterModule, FullCalendarModule, CalendarCommonModule, CanvasJSAngularChartsModule],
  templateUrl: './view-reports.component.html',
  styleUrl: './view-reports.component.css'
})
@Injectable({providedIn: 'root'})
export class ViewReportsComponent {
  constructor(private http: HttpClient){}

  e = [{ title: 'event 1', date: '2024-07-07' }]

  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin],
    weekends: true,
    initialView: 'dayGridMonth',
    events: this.e
  };

  chartOptions = {
    title: {
      text: "Most Frequent Donors"
    },
    data: [{
      type: "bar",
      indexLabel: "{y}",
      dataPoints: [
        {label: "AcmeAdmin", y: 1}
      ]
    }]                
    };


  expirationDates = [];
  names = [];
  average = 0;
  numItems = 0;
  donators = [];
  donators_map = new Map();
  showCalendar = true;
  ngOnInit() {
    this.http.get<any>('http://localhost:3000/dbInfo/expirationDates').subscribe((response) => {
      this.expirationDates = response[0];
      this.names = response[1];
    });

    this.http.get<any>('http://localhost:3000/dbInfo/average').subscribe((response) => {
      this.average = response;
    });

    this.http.get<any>('http://localhost:3000/dbInfo/numItems').subscribe((response) => {
      this.numItems = response;
    });

    this.http.get<any>('http://localhost:3000/dbInfo/donaters').subscribe((response) => {
      this.donators = response;
    });

    this.donators.forEach((name: string) => {
      if (this.donators_map.has(name)) {
          this.donators_map.set(name, this.donators_map.get(name)! + 1);
      } else {
          this.donators_map.set(name, 1);
      }
    });
    console.log("Page Constructed")

    for (let i = 0; i < this.expirationDates.length; i++){
      if (this.expirationDates[i] !== ""){
        this.e.push({title: this.names[i], date: this.expirationDates[i]});
      }
    }
    for (const [key, value] of this.donators_map) {
      this.chartOptions.data[0].dataPoints.push({label: key, y: value});
    }
  }

  buttonClick(){
    this.showCalendar = !this.showCalendar;
  }
}