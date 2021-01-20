import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CurrenciesComponent } from './currencies/currencies.component';
import { CryptocurrenciesComponent} from './cryptocurrencies/cryptocurrencies.component';
import { MetalsComponent } from './metals/metals.component';
import { StockComponent } from './stock/stock.component';
import { LandingPageComponent } from './landing-page/landing-page.component';

const routes: Routes = [
  {path: 'currencies', component: CurrenciesComponent},
  {path: 'cryptocurrencies', component: CryptocurrenciesComponent},
  {path: 'metals', component: MetalsComponent},
  {path: 'stock', component: StockComponent},
  {path: 'landingPage', component: LandingPageComponent},
  {path: '', redirectTo: '/landingPage', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
