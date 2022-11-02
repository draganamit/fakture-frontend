import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RegisterUser } from '../models/regstration.model';
import { RegistrationService } from '../register.service';


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
           alert("uspjesna")

            this.name = '';
            this.surname = '';
            this.telephone = '';
            this.password = '';
            this.confirmPassword = '';
           }
           catch (error) {
            alert("Korisnik postoji");
          }
        }
        else{
            alert("Neuspjesno");
            
        }
    }
}