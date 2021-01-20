import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CurrenciesComponent } from './currencies/currencies.component';
import { CryptocurrenciesComponent} from './cryptocurrencies/cryptocurrencies.component';
import { MetalsComponent } from './metals/metals.component';
import { StockComponent } from './stock/stock.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { SignUpPageComponent } from './sign-up-page/sign-up-page.component';

const routes: Routes = [
  {path: 'currencies', component: CurrenciesComponent},
  {path: 'cryptocurrencies', component: CryptocurrenciesComponent},
  {path: 'metals', component: MetalsComponent},
  {path: 'stock', component: StockComponent},
  {path: 'landingPage', component: LandingPageComponent},
  {path: '', redirectTo: '/landingPage', pathMatch: 'full'},
  {path: 'login', component: LoginPageComponent},
  {path: 'signUp', component: SignUpPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
