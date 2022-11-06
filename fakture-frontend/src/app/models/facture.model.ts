import { Article } from './article.model';
export interface Facture{
    id:number;
    datum: Date;
    partner: string;
    iznosBezPdv: number;
    postoRabata:number;
    rabat:number;
    iznosSaRabatomBezPdv:number;
    pdv:number;
    ukupno:number;
    artikli:Article[];
};