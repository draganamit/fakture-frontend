import { Component } from "@angular/core";
import { Router } from "@angular/router";

@Component({
    selector: 'app-facture',
    templateUrl: './facture.html',
    styleUrls: ['./facture.css']
  })
  export class FactureComponent {
    title = 'fakture-frontend';
    constructor( private router: Router){}

    Logout(){
      localStorage.removeItem('token');
      this.router.navigate(['']);
    }
  }
  