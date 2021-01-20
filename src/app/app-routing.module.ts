import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CurrenciesComponent } from './currencies/currencies.component';
import { CryptocurrenciesComponent} from './cryptocurrencies/cryptocurrencies.component';

const routes: Routes = [
  {path: 'currencies', component: CurrenciesComponent},
  {path: 'cryptocurrencies', component: CryptocurrenciesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
