import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RegisterUser } from '../models/regstration.model';
import { RegistrationService } from '../services/register.service';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.html',
  styleUrls: ['./registration.css']
})
export class RegistrationComponent implements OnInit{
  title = 'fakture-frontend';

  constructor(private registrationService:RegistrationService, private router:Router) { }
    ngOnInit(): void {
        
    }
    regSuccess:boolean=false;
    name:string='';
    surname:string='';
    telephone:string='';
    email:string='';
    password:string='';
    confirmPassword:string='';

    regUser: RegisterUser = {
        name:'',
        surname:'',
        telephone:'',
        email:'',
        password:'',
    }

   async registrationUser(){
     this.regSuccess=false;
        if(this.password==this.confirmPassword)
        {
            try
            {
              this.regUser.name = this.name;
              this.regUser.surname = this.surname;
              this.regUser.telephone = this.telephone;
              this.regUser.password = this.password;
              this.regUser.email = this.email;
              await this.registrationService.registration(this.regUser)
              this.regSuccess=true;
              this.name = '';
              this.surname = '';
              this.telephone = '';
              this.email = '';
              this.password = '';
              this.confirmPassword = '';
           }
           catch (error) {
            console.log("error:", error);
          }
        }
        else{
            console.log("Neuspjesna registracija");  
        }
    }
}