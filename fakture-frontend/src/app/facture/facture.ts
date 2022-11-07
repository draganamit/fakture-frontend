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
    add: boolean = false;
    update: boolean = false;
    idUpdate:number = 0;


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
  updateFacture(id:number){
    this.update=true
    this.idUpdate=id;
  }
  closeWindow(){
    this.add=false;
    this.update=false;
    this.idUpdate=0;

  }
  addFacture(){
    this.add=true;
  }
  async closeAddFacture(){
    this.add=false;
    this.idUpdate=0;
    await this.allFacture();
  }
  async closeUpdateFacture(){
    this.update=false;
    this.idUpdate=0;
    await this.allFacture();
  }
  Logout(){
      localStorage.removeItem('token');
      this.router.navigate(['']);
  }
  }
  