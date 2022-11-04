import { Component, OnInit } from '@angular/core';
import { Article } from '../models/article.model';


@Component({
  selector: 'app-addFacture',
  templateUrl: './addFacture.html',
  styleUrls: ['./addFacture.css']
})
export class AddFactureComponent implements OnInit{
  ngOnInit(): void {
      
  }
  title = 'fakture-frontend';
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
  articles: Article[] = [];

  addInArticles(){
    this.articles.push(Object.assign({},this.newArticle));
  }
  removeFromArticles(index: number){
    this.articles.splice(index,1);
  }
}