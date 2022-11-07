import { Injectable } from '@angular/core';
import axios from 'axios';
import { Facture } from '../models/facture.model';
import { ResponseModel } from '../models/response.model';

@Injectable({
  providedIn: 'root'
})
export class AddFactureService {

  constructor() { }
  async getFactureById(id:Number | undefined){
    return await axios.get<ResponseModel>("https://localhost:44350/facture/"+id)
  }
  async addFacture(newFacture:Facture){
    return await axios.post<ResponseModel>("https://localhost:44350/facture", newFacture);
  }
  async updateFacture(updatedFacture:Facture){
    return await axios.put<ResponseModel>("https://localhost:44350/facture/"+updatedFacture.id, updatedFacture);
  }
}
