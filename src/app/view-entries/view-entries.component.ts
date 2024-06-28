import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface Item {
  name: string;
  quantity: number;
  expiration: Date;
  cost: number;
  donatedBy: string;
}

@Component({
  selector: 'app-view-entries',
  templateUrl: './view-entries.component.html',
  styleUrls: ['./view-entries.component.css']
})
export class ViewEntriesComponent implements OnInit {
  items: Item[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.fetchItems();
  }

  fetchItems(): void {
    this.http.get<Item[]>('http://localhost:4200/items')
      .subscribe(data => {
        this.items = data;
      });
  }
}
