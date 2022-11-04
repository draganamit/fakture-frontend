import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Facture } from "../models/facture.model";
import { FactureService } from "../services/facture.service";

@Component({
    selector: 'app-facture',
    templateUrl: './facture.html',
    styleUrls: ['./facture.css']
  })
  export class FactureComponent implements OnInit {
    title = 'fakture-frontend';
    factures: Facture[] = [];
    add: boolean = true;

    constructor( private router: Router, private factureService: FactureService){}
  ngOnInit(): void {
    this.allFacture();
  }
  async allFacture(){
    try {
      const response = await this.factureService.getAllFacture();
      this.factures = response.data.data;
      console.log(this.factures);
      
    } catch (error) {
      console.log("error:", error);
    }
  }
  async deleteFacture(id:Number){
    try {
      await this.factureService.deleteFacture(id);
      this.allFacture();
    } catch (error) {
      console.log("error:", error);
      
    }
  }
  closeWindow(){
    this.add=false;
  }
  addFacture(){
    this.add=true;
  }
    Logout(){
      localStorage.removeItem('token');
      this.router.navigate(['']);
    }
  }
  