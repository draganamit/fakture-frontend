import { Injectable } from '@angular/core';
import axios from 'axios';
import { ResponseModel } from '../models/response.model';

@Injectable({
  providedIn: 'root'
})
export class AddFactureService {

  constructor() { }
  async getFactureById(id:Number | undefined){
    return await axios.get<ResponseModel>("https://localhost:44350/facture/"+id)
  }
}
