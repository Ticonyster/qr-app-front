import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { PromoComponent } from './pages/promo/promo.component';


const routes: Routes = [
  {path:'Inicio', component:HomeComponent},
  {path:'Promo/:id',  component:PromoComponent},
  {path:'**', redirectTo: '/Inicio'  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes),],
  exports: [RouterModule]
})
export class AppRoutingModule { }
