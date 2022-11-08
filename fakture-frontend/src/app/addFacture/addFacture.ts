import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { from, map, reduce } from 'rxjs';
import { Article } from '../models/article.model';
import { Facture } from '../models/facture.model';
import { AddFactureService } from '../services/add-facture.service';

@Component({
  selector: 'app-addFacture',
  templateUrl: './addFacture.html',
  styleUrls: ['./addFacture.css']
})
export class AddFactureComponent implements OnInit{
  constructor(private addFactureService: AddFactureService){}
  async ngOnInit(): Promise<void> {
      console.log(this.pomIndex);
      if(this.idUpdate==0)
      {
        this.buttonText='Dodaj fakturu';
      }
      else{
        this.buttonText='Sačuvaj izmjene';
        try {
          const response = await this.addFactureService.getFactureById(this.idUpdate);
          console.log(response.data.data);
          this.newFacture = response.data.data;
          
          // this.newFacture.datum = 
          this.articles = response.data.data.artikli;
        } catch (error) {
          console.log("error:", error);
        }
      }
      
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
  buttonText:string = '';
  @Input() idUpdate: Number | undefined;


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
  pomIndex: number =-1;
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
    if(this.newArticle.kolicina>0 && this.newArticle.cijena>0)
    {
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
  else{
    console.log("Neispravan unos");
    
  }
  }
  @Output() closeAdd = new EventEmitter<string>();
  @Output() closeUpdate = new EventEmitter<string>();

  async removeFromArticles(index: number){
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
    this.newArticle.iznosBezPdv=parseFloat((this.newArticle.kolicina * this.newArticle.cijena).toFixed(2));
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

    let iznosBezPdv = from(this.newFacture.artikli).pipe(reduce((acc,artikal) => acc + artikal.iznosBezPdv,0));
    iznosBezPdv.subscribe(x => this.newFacture.iznosBezPdv = parseFloat(x.toFixed(2)));

    let postoRabataPom = from(this.newFacture.artikli).pipe(reduce((acc,artikal) => acc + artikal.postoRabata,0));
    postoRabataPom.subscribe(x => this.pomPostoRabata = parseFloat(x.toFixed(2)));

    let rabat = from(this.newFacture.artikli).pipe(reduce((acc,artikli) => acc + artikli.rabat,0));
    rabat.subscribe(x => this.newFacture.rabat = parseFloat(x.toFixed(2)));

    let iznosSaRabatomBezPdv = from(this.newFacture.artikli).pipe(reduce((acc, artikal) => acc + artikal.iznosSaRabatomBezPdv,0));
    iznosSaRabatomBezPdv.subscribe(x => this.newFacture.iznosSaRabatomBezPdv = parseFloat(x.toFixed(2)));

    let pdv = from(this.newFacture.artikli).pipe(reduce((acc,artikal) => acc + artikal.pdv,0));
    pdv.subscribe(x => this.newFacture.pdv = parseFloat(x.toFixed(2)));

    let ukupno = from(this.newFacture.artikli).pipe(reduce((acc,artikal) => acc + artikal.ukupno,0));
    ukupno.subscribe(x => this.newFacture.ukupno = parseFloat(x.toFixed(2)));
  
    if(this.articles.length>0)
    {
      this.newFacture.postoRabata = parseFloat((this.pomPostoRabata/this.articles.length).toFixed(2));
    }
  }
  update(pomUpdateArticle: Article, index:number){
    this.newArticle=Object.assign({},pomUpdateArticle);
    this.pomIndex = index;
    this.updateArticle=true;
    console.log(this.pomIndex);

  }
  sacuvajIzmjene(){
    if(this.newArticle.kolicina>0 && this.newArticle.cijena>0)
    {
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
    this.pomIndex=-1;
  }
  else
  {
    console.log("Neispravan unos");
  }
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
    this.pomIndex=-1;
  }
  async addFacture(){
    if(this.idUpdate==0)
    {
      if(this.articles.length>0 && this.newFacture.partner!='')
      {
      try {
        await this.addFactureService.addFacture(this.newFacture);
        this.closeAdd.emit();
      } catch (error) {
        console.log("error:", error);
      }
      }
      else
      {
        console.log("Neispravan unos");
      }
    }
    else
    {
      if(this.articles.length>0 && this.newFacture.partner!='')
      {
      try {
        await this.addFactureService.updateFacture(this.newFacture);
        this.closeUpdate.emit();
      } catch (error) {
        console.log("error:", error); 
      }
      }
      else
      {
        console.log("Neispravan unos"); 
      }
  }
  }
}