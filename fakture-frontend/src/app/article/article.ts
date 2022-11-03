import { Component, Input } from '@angular/core';


@Component({
  selector: 'app-article',
  templateUrl: './article.html',
  styleUrls: ['./article.css']
})
export class ArticleComponent {
  title = 'fakture-frontend';

  @Input() id: Number | undefined;
  @Input() naziv: string | undefined;
  @Input() kolicina: Number | undefined;
  @Input() cijena: Number | undefined;
  @Input() iznosBezPdv: Number | undefined;
  @Input() postoRabata: Number | undefined;
  @Input() rabat: Number | undefined;
  @Input() iznosSaRabatomBezPdv: Number | undefined;
  @Input() pdv: Number | undefined;
  @Input() ukupno: Number | undefined;
}