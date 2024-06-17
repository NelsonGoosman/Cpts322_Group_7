import { Component, Injectable } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgFor } from '@angular/common';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-data-entry',
  standalone: true,
  imports: [FormsModule, NgFor],
  templateUrl: './data-entry.component.html',
  styleUrl: './data-entry.component.css'
})

@Injectable ({providedIn: 'root'})
export class DataEntryComponent {
    name = "Item Name";
    description = "Item Description";
    expirationDate = "";
    price = 0;
    totalItems = 0;
    items = [
      { name: this.name, description: this.description, expirationDate: this.expirationDate, price: this.price }
    ];

    addRow() {
      if (this.totalItems < 10){
        this.items.push({ name: '', description: '', expirationDate: '', price: this.price });
        this.totalItems++;
      }
    }

    submitData(){
      if (this.totalItems > 0){

      }
    }
}
