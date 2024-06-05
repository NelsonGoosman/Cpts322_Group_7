import { Component, OnInit, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { homedir } from 'os';
import { HomeComponent } from '../home/home.component';
import { RouterLink, RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent {
  email = "";
  password = "";
  constructor(private router: Router){

  }
  login(){
    
      this.router.navigate(['/home'])
  }
  

}
