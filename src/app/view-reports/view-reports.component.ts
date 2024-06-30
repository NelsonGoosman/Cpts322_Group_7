import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { OnInit, Input, Injectable } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-view-reports',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './view-reports.component.html',
  styleUrl: './view-reports.component.css'
})

@Injectable({providedIn: 'root'})
export class ViewReportsComponent {
  constructor(private http: HttpClient){}

  ngOnInit() {
    this.http.get<any>('http://localhost:3000/dbInfo/expirationDates').subscribe((response) => {
      console.log(response);
    });
  }
}
