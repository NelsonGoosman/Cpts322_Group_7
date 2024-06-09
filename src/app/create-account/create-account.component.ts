import { Component, OnInit, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { homedir } from 'os';
import { HomeComponent } from '../home/home.component';
import { RouterLink, RouterModule, Router } from '@angular/router';
@Component({
  selector: 'app-create-account',
  standalone: true,
  imports: [RouterModule, FormsModule],
  templateUrl: './create-account.component.html',
  styleUrl: './create-account.component.css'
})
export class CreateAccountComponent {
  newEmail = "";
  newPassword = "";
  constructor(private router: Router){

  }
  create(){
    
      this.router.navigate(['/home'])
  }
}
