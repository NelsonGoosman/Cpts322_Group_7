import { Component, Injectable } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgFor } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { stringify } from 'node:querystring';

export interface Item{
  name: string;
  description: string;
  expiration: string;
  price: number;
  donatedBy: string;
  ID: number;
}

@Component({
  selector: 'app-data-entry',
  standalone: true,
  imports: [FormsModule, NgFor],
  templateUrl: './data-entry.component.html',
  styleUrl: './data-entry.component.css'
})

@Injectable ({providedIn: 'root'})
export class DataEntryComponent {

  constructor (private http: HttpClient) {}

  totalItems = 0;
  items: Item[] = [];
  name = '';
  description = '';
  expiration = '';
  price = 0;
  donatedBy = '';
  errorMessage = '';
  showError = false;

  addRow() {
    // Add validation to make sure that there is no empty fields
    if (this.totalItems < 10){

      this.items.push({name: this.name, 
        description: this.description, 
        expiration: this.expiration, 
        price: this.price, 
        donatedBy: this.donatedBy,
        ID: this.totalItems
      });

      this.name = '';
      this.description = '';
      this.expiration = '';
      this.price = 0;
      this.donatedBy = '';
      this.showError = false;
      this.totalItems++;
    }
  }

  submitData(){

    if (this.totalItems > 0 && this.verifyItems() === true)
      {
      this.http.post<any>('http://localhost:3000/item/enterItems', this.items).subscribe((response) => {
        console.log(response);
        this.showError = false;
      });

    }else if (this.totalItems == 0)
    {
      this.errorMessage = "Error: No items to submit";
      this.showError = true;
    }else{
      this.errorMessage = "Error: Name field cannot be empty";
      this.showError = true;
    }

  }

  verifyItems(){
    for(var i = 0; i < this.items.length; i++){
      if (this.items[i].name === '') return false;
    }
    return true;
  }

}
