import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginUser } from './models/login.model';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  logUrl = "https://localhost:44350/auth/login"
  constructor(private http : HttpClient) { }
  //Prijava
  async login(user:LoginUser){
    return await axios.post<string>(this.logUrl, user);
  }
}
