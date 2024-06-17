import { Component, OnInit, Input, Injectable } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

@Injectable({providedIn: 'root'})
export class LoginComponent {

  email: string = "";
  password: string = "";
  validUser: boolean = false;
  loginAttempt: boolean = false;
  loginStatus: string = "";
  constructor(private router: Router, private http: HttpClient){}

  login(){

    const loginData = {
      email: this.email,
      password: this.password
    };
    // set up api routs at /login
    this.http.post('/server/api/user/signin', loginData).subscribe( //idk if this route is correct
      (response: any) => {
        if (response.validUser){ //response needs to contain valid user boolean
          this.validUser = true;
          this.router.navigate(['/home'])
        } else{
          this.validUser = false;
          this.loginStatus = response.message;
        }
      },
      (error) => {
        this.validUser = false;
        alert('An error occurred during login');
        console.error('Login error', error);
      }
    );

    this.loginAttempt = true;
  }
  

}
