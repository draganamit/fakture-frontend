import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { LoginUser } from '../models/login.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent implements OnInit{
  constructor(private loginService: LoginService, private router: Router){}
  ngOnInit(): void {
    
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
    if(this.email!='' && this.password!='')
    {
      this.logUser.email=this.email;
      this.logUser.password = this.password;
      try
      {
        const res = await this.loginService.login(this.logUser);
        this.email ='';
        this.password ='';
        localStorage.setItem('token', res.data);
        this.router.navigate(['facture']);
      }
      catch (error) {
        console.log("error:", error);
      }
      /*this.loginService.login(this.logUser).subscribe(data =>
        {
          localStorage.setItem('token', data);
          this.router.navigate(['facture']);
        },
        error=>{
          alert("Neuspjesn login");
        });*/
    }
    else{
      console.log("Unesite email i password");
      
    }
  }
}