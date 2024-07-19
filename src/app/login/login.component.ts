import { Component, OnInit, Input, Injectable } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

export interface email{
  email: string,
  message: string,
  subject: string,
  duration: string
}

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
  showError: boolean = false;
  errorMessage: string = "";
  constructor(private router: Router, private http: HttpClient){}
  showOtp = false;
  otp = "";
  
  login(){

    const loginData = {
      email: this.email,
      password: this.password
    };
    // set up api routs at /login
    this.http.post<any>('http://localhost:3000/user/signin', loginData).subscribe((response) => {
      console.log(response);
      if (response.status == "SUCCESS"){
        this.showOtp = true;
        
        this.http.post<any>('http://localhost:3000/otp/sendOtp',{email: this.email, message: "Acme Two Factor Authentication", subject: "Welcome to Acme DB. Enter this code on the site to login", duration: 1}
        ).subscribe((response) => {
      console.log(response);
    });  
      }else{
        this.showError = true;
        this.errorMessage = response.message;
      }
    });  
  }

  authenticate(){
    this.http.post<any>('http://localhost:3000/otp/valid', {email: this.email, otp: this.otp}).subscribe((response) => {
      console.log(response);
      if (response.valid == true){
        this.router.navigate(['/home'])
      }
      console.log(response);
    });  
  }
  

}
