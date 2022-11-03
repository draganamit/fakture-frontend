import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login';
import { RegistrationComponent } from './registration/registration';
import {HttpClientModule} from '@angular/common/http';
import { FactureComponent } from './facture/facture';
import { HomeComponent } from './home/home';
import { FactureBaseComponent } from './factureBase/factureBase';
import { ArticleComponent } from './article/article';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    FactureComponent,
    HomeComponent,
    FactureBaseComponent,
    ArticleComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
