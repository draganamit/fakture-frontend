import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Article } from '../models/article.model';


@Component({
  selector: 'app-factureBase',
  templateUrl: './factureBase.html',
  styleUrls: ['./factureBase.css']
})
export class FactureBaseComponent implements OnInit{
  ngOnInit(): void {
    
  }
  title = 'fakture-frontend';
  constructor(){};

  @Input() id: Number | undefined;
  @Input() datum: Date | undefined;
  @Input() partner: string | undefined;
  @Input() iznosBezPdv: Number | undefined;
  @Input() postoRabata: Number | undefined;
  @Input() rabat: Number | undefined;
  @Input() iznosSaRabatomBezPdv: Number | undefined;
  @Input() pdv: Number | undefined;
  @Input() ukupno: Number | undefined;
  @Input() artikli: Article[] | undefined;

  @Output() removeFacture = new EventEmitter<string>();
  @Output() updateFacture = new EventEmitter<string>();


  update(){
    this.updateFacture.emit();
  }
  remove(){
    this.removeFacture.emit();
  }


}
