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
  constructor(private router: Router, private http: HttpClient){

  }
  dataSent(){
    alert();
  }
  error(){}
  create(){
    const userdata = {
      name: this.name,
      email: this.newEmail,
      password: this.newPassword
    };

  

    this.http.post('/Server/user/signup', userdata).subscribe({
      next: (v: any) => alert(v),
      error: (e: any) => alert(e)
  });
    //this.router.navigate(['/home'])
  }
}
