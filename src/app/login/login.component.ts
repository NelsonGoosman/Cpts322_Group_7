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
  showError: boolean = false;
  errorMessage: string = "";
  constructor(private router: Router, private http: HttpClient){}

  login(){

    const loginData = {
      email: this.email,
      password: this.password
    };
    // set up api routs at /login
    this.http.post<any>('http://localhost:3000/user/signin', loginData).subscribe((response) => {
      console.log(response);
      if (response.status == "SUCCESS"){
        this.router.navigate(['/home'])
      }else{
        this.showError = true;
        this.errorMessage = response.message;
      }
    });
  
  }
  

}
