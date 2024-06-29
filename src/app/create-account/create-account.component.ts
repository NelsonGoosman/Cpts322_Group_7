import { Component, OnInit, Input, Injectable } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { homedir } from 'os';
import { HomeComponent } from '../home/home.component';
import { RouterLink, RouterModule, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { response } from 'express';

@Component({
  selector: 'app-create-account',
  standalone: true,
  imports: [RouterModule, FormsModule],
  templateUrl: './create-account.component.html',
  styleUrl: './create-account.component.css'
})

@Injectable({providedIn: 'root'})
export class CreateAccountComponent {
  newEmail = "";
  newPassword = "";
  name = "TestName";
  showError = false;
  errorMessage = "";
  constructor(private router: Router, private http: HttpClient){}
 
  create(){
    const userdata = {
      name: this.name,
      email: this.newEmail,
      password: this.newPassword
    };

  

    this.http.post<any>('http://localhost:3000/user/signup', userdata).subscribe((response) => {
      console.log(response);
      if (response.status == "SUCCESS"){
        alert("Account created successfully! Close this message to proceed to login.")
        this.router.navigate(['/login'])
      }else{
        this.showError = true;
        this.errorMessage = response.message;
      }
    });
    
  }
}
