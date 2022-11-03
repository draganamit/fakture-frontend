import { Injectable } from '@angular/core';
import axios from 'axios';
import { Facture } from '../models/facture.model';
import { ResponseModel } from '../models/response.model';

@Injectable({
  providedIn: 'root'
})
export class FactureService {
  baseUrl = "https://localhost:44350/facture/getallfacture";

  constructor() { }
  async getAllFacture(){
    return await axios.get<ResponseModel>(this.baseUrl);
  }
}
