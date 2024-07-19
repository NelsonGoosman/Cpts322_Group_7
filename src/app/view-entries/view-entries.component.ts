import { Component, Injectable } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgFor } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';

export interface Item{
  name: string;
  description: string;
  expiration: string;
  price: number;
  donatedBy: string;
  ID: number;
  itemID: any;
}

@Component({
  selector: 'app-view-entries',
  standalone: true,
  imports: [RouterModule, NgFor, FormsModule],
  templateUrl: './view-entries.component.html',
  styleUrl: './view-entries.component.css'
})


@Injectable({providedIn: 'root'})
export class ViewEntriesComponent {
  constructor (private http: HttpClient) {}

  items: Item[] = [];
  totalItems = 0;
  edit = false;

  ngOnInit(){
    this.http.get<any>('http://localhost:3000/dbInfo/all').subscribe((response) => {
      for (let i = 0; i < response.length; i++){
        this.items.push({
          name: response[i].name,
          description: response[i].description,
          expiration: response[i].expiration,
          price: response[i].cost,
          donatedBy: response[i].donatedBy,
          ID: i,
          itemID: response[i]._id
        })
      }
      this.totalItems = this.items.length;
    })
  }

  remove(index: number){
    const itemID = this.items[index].itemID;
    for (let i = index + 1; i < this.items.length; i++){
      this.items[i].ID -= 1;
    }
    this.items.splice(index, 1);
    console.log(itemID);
    this.http.post<any>('http://localhost:3000/dbInfo/delete', { id: itemID }).subscribe((response) => {
    })
  }
  
}



