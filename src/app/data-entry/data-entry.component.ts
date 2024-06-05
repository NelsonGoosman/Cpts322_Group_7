import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgFor } from '@angular/common';
@Component({
  selector: 'app-data-entry',
  standalone: true,
  imports: [FormsModule, NgFor],
  templateUrl: './data-entry.component.html',
  styleUrl: './data-entry.component.css'
})
export class DataEntryComponent {
    name = "";
    description = "";
    expirationDate = "";
    price = 0;
    items = [
      { name: '', description: '', expirationDate: '', price: null }
    ];

    addRow() {
      this.items.push({ name: '', description: '', expirationDate: '', price: null });
    }
}
