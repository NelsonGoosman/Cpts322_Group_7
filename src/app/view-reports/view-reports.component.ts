import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FullCalendarModule } from '@fullcalendar/angular';
import { Calendar, CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import { CalendarCommonModule } from 'angular-calendar';
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

  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin],
    initialView: 'dayGridMonth',
    weekends: false,
    events: [
      { title: 'Meeting', start: new Date() },
      { title: 'event 2', date: '2024-06-17' }
    ]
  };

  chartOptions = {
    title: {
      text: "Basic Column Chart in Angular"
    },
    data: [{
      type: "column",
      dataPoints: [
      { label: "Apple",  y: 10  },
      { label: "Orange", y: 15  },
      { label: "Banana", y: 25  },
      { label: "Mango",  y: 30  },
      { label: "Grape",  y: 28  }
      ]
    }]                
    };

  expirationDates = [];
  average = 0;
  numItems = 0;
  donators = [];
  donators_map = new Map();

  ngOnInit() {
    this.http.get<any>('http://localhost:3000/dbInfo/expirationDates').subscribe((response) => {
      this.expirationDates = response;
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

    this.donators.forEach(name => {
      if (this.donators_map.has(name)) {
          this.donators_map.set(name, this.donators_map.get(name)! + 1);
      } else {
          this.donators_map.set(name, 1);
      }
  });

  }
}
