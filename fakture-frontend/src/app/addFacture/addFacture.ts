import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { map } from 'rxjs';
import { Article } from '../models/article.model';
import { Facture } from '../models/facture.model';


@Component({
  selector: 'app-addFacture',
  templateUrl: './addFacture.html',
  styleUrls: ['./addFacture.css']
})
export class AddFactureComponent implements OnInit{
  ngOnInit(): void {
      
  }
  @ViewChild('f') f:any;

ngAfterViewInit() {
  /*this.f.form.valueChanges.subscribe((change:any) => {
   console.log(change)
   this.newArticle.iznosBezPdv = change.kolicina * change.cijena;
  })*/
  
}
  updateArticle:boolean=false;
  title = 'fakture-frontend';
  pomPostoRabata:number = 0;

  newArticle: Article = {
    id: 0,
    naziv:'',
    kolicina: 0,
    cijena: 0,
    iznosBezPdv: 0,
    postoRabata: 0,
    rabat: 0,
    iznosSaRabatomBezPdv: 0,
    pdv: 0,
    ukupno: 0,
  };
  pomIndex: number =0;
  articles: Article[] = [];
  newFacture: Facture ={
    id:0,
    datum: new Date(),
    partner: '',
    iznosBezPdv: 0,
    postoRabata:0,
    rabat:0,
    iznosSaRabatomBezPdv:0,
    pdv:0,
    ukupno:0,
    artikli:[],
  }
  addInArticles(){
    this.articles.push(Object.assign({},this.newArticle));
    this.izracunajVtijednostiFakture();
    this.newArticle={
      id: 0,
      naziv:'',
      kolicina: 0,
      cijena: 0,
      iznosBezPdv: 0,
      postoRabata: 0,
      rabat: 0,
      iznosSaRabatomBezPdv: 0,
      pdv: 0,
      ukupno: 0,
    }
  }
  removeFromArticles(index: number){
    this.articles.splice(index,1);
    this.izracunajVtijednostiFakture();
  }

  /*
  IznosBezPdv=Kolicina*Cijena,
Rabat=IznosBezPdv*RabatPosto/100 (Zaokruženo na 2 decimale)
IznosSaRabatomBezPdv = IznosBezPdv-Rabat
Pdv= IznosSaRabatomBezPdv * 0,17 (Zaokruženo na 2 decimale) Ukupno= IznosSaRabatomBezPdv+Pdv
*/
  kolicinaChange(arg:number){
    this.izracunajVrijednosti();
  }
  cijenaChange(arg:number){
    this.izracunajVrijednosti();
  }
  iznosBezPdvChange(arg:number){
    const val = arg ? arg : 0;
    this.newArticle.cijena=parseFloat((val/this.newArticle.kolicina).toFixed(2));
    this.izracunajVrijednosti();
  }
  postoRabataChange(arg:number){
    this.izracunajVrijednosti();
  }
  rabataChange(arg:number){
    const val = arg ? arg : 0;
    this.newArticle.postoRabata=parseFloat(((val*100)/this.newArticle.iznosBezPdv).toFixed(2))
    this.izracunajVrijednosti();
  }
  iznosSaRabatomBezPdvChange(arg:number){
    const val = arg ? arg : 0;
    this.newArticle.postoRabata=parseFloat((((this.newArticle.iznosBezPdv-val)*100)/this.newArticle.iznosBezPdv).toFixed(2));
    this.izracunajVrijednosti();
  }
  pdvChange(arg:number){
    const val = arg ? arg : 0;
    console.log(val);
    this.newArticle.cijena=parseFloat(((val/0.17)/(this.newArticle.kolicina*(1-this.newArticle.postoRabata/100))).toFixed(2));
    this.izracunajVrijednosti();
  }
  izracunajVrijednosti(){
    this.newArticle.iznosBezPdv=this.newArticle.kolicina * this.newArticle.cijena;
    this.newArticle.rabat=parseFloat(((this.newArticle.postoRabata*this.newArticle.iznosBezPdv)/100).toFixed(2));
    this.newArticle.iznosSaRabatomBezPdv=parseFloat((this.newArticle.iznosBezPdv-this.newArticle.rabat).toFixed(2));
    this.newArticle.pdv=parseFloat((this.newArticle.iznosSaRabatomBezPdv*17/100).toFixed(2));
    this.newArticle.ukupno=parseFloat((this.newArticle.pdv+this.newArticle.iznosSaRabatomBezPdv).toFixed(2));
  }
  onKeyDownEvent(e:any){
        if(e.key == 'e' || e.key=='-' || e.key=='+')
        {
          e.preventDefault()
        }
        
  }
  izracunajVtijednostiFakture()
  {
    this.newFacture.iznosBezPdv=0;
    this.newFacture.postoRabata=0;
    this.newFacture.rabat=0;
    this.newFacture.iznosSaRabatomBezPdv=0;
    this.newFacture.pdv=0;
    this.newFacture.ukupno=0;
    this.newFacture.artikli=this.articles;
    this.pomPostoRabata=0;

    for(let i=0; i<this.articles.length;i++)
    {
      this.newFacture.iznosBezPdv=this.newFacture.iznosBezPdv+this.articles[i].iznosBezPdv;
      this.pomPostoRabata = parseFloat(((this.pomPostoRabata+this.articles[i].postoRabata)).toFixed(2));
      this.newFacture.rabat=parseFloat((this.newFacture.rabat+this.articles[i].rabat).toFixed(2));
      this.newFacture.iznosSaRabatomBezPdv=parseFloat((this.newFacture.iznosSaRabatomBezPdv+this.articles[i].iznosSaRabatomBezPdv).toFixed(2));
      this.newFacture.pdv=parseFloat((this.newFacture.pdv+this.articles[i].pdv).toFixed(2));
      this.newFacture.ukupno=parseFloat((this.newFacture.ukupno+this.articles[i].ukupno).toFixed(2));
    }
    this.newFacture.postoRabata = parseFloat((this.pomPostoRabata/this.articles.length).toFixed(2));
  }
  update(pomUpdateArticle: Article, index:number){
    this.newArticle=Object.assign({},pomUpdateArticle);
    this.pomIndex = index;
    this.updateArticle=true;
  }
  sacuvajIzmjene(){
    this.articles[this.pomIndex]=this.newArticle;
    this.izracunajVtijednostiFakture();

    this.newArticle = {
      id: 0,
      naziv:'',
      kolicina: 0,
      cijena: 0,
      iznosBezPdv: 0,
      postoRabata: 0,
      rabat: 0,
      iznosSaRabatomBezPdv: 0,
      pdv: 0,
      ukupno: 0,
    }
    this.updateArticle=false;
  }
  odbaciIzmjene(){
    this.newArticle = {
      id: 0,
      naziv:'',
      kolicina: 0,
      cijena: 0,
      iznosBezPdv: 0,
      postoRabata: 0,
      rabat: 0,
      iznosSaRabatomBezPdv: 0,
      pdv: 0,
      ukupno: 0,
    }
    this.updateArticle=false;
    this.pomIndex=0;
  }
}