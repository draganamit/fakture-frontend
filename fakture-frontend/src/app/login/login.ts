import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { LoginService } from '../login.service';
import { LoginUser } from '../models/login.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent implements OnInit{
  constructor(private loginService: LoginService, private router: Router){}
  ngOnInit(): void {
    if(localStorage.getItem('token'))
      this.router.navigate(['facture']);
  }
  title = 'fakture-frontend';

  email:string='';
  password:string='';

  logUser: LoginUser ={
    email:'',
    password:''
  }

  async loginUser()
  {
    this.logUser.email=this.email;
    this.logUser.password = this.password;
    const res = await this.loginService.login(this.logUser);
    alert("uspjesna");
    localStorage.setItem('token', res.data);
    this.router.navigate(['facture']);
    /*this.loginService.login(this.logUser).subscribe(data =>
      {
        localStorage.setItem('token', data);
        this.router.navigate(['facture']);
      },
      error=>{
        alert("Neuspjesn login");
      });*/
  }
}