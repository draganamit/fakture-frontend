import { Article } from './article.model';
export interface Facture{
    id:Number;
    datum: Date;
    partner: string;
    iznosBezPdv: Number;
    postoRabata:Number;
    rabat:Number;
    iznosSaRabatomBezPdv:Number;
    pdv:Number;
    ukupno:Number;
    artikli:Article[];
};