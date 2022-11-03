import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FactureComponent } from './facture/facture';
import { AuthGuard } from './guard/auth.guard';
import { HomeComponent } from './home/home';


const routes: Routes = [
  {path:'facture', component: FactureComponent, canActivate: [AuthGuard] },
  {path:'', component: HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
