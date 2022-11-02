import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, retry } from 'rxjs';
import { RegisterUser } from '../models/regstration.model';
import axios from 'axios';


@Injectable({
  providedIn: 'root'
})
export class RegistrationService {
  regUrl = "https://localhost:44350/auth/register"

  constructor(private http: HttpClient) { }
  //Registracija
  async registration(user:RegisterUser)
  {

  return  await  axios.post<Number>(this.regUrl, user);

    // return this.http.post<Number>(this.regUrl,user);
  }
}
