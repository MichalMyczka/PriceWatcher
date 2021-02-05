import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CurrenciesComponent } from './components/currencies/currencies.component';
import { CryptocurrenciesComponent} from './components/cryptocurrencies/cryptocurrencies.component';
import { MetalsComponent } from './components/metals/metals.component';
import { StockComponent } from './components/stock/stock.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { SignUpPageComponent } from './components/sign-up-page/sign-up-page.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { UserFavouritesComponent } from './components/user-favourites/user-favourites.component';

const routes: Routes = [
  {path: 'currencies', component: CurrenciesComponent},
  {path: 'cryptocurrencies', component: CryptocurrenciesComponent},
  {path: 'metals', component: MetalsComponent},
  {path: 'stock', component: StockComponent},
  {path: 'landingPage', component: LandingPageComponent},
  {path: '', redirectTo: '/landingPage', pathMatch: 'full'},
  {path: 'login', component: LoginPageComponent},
  {path: 'signUp', component: SignUpPageComponent},
  {path: 'profile', component: UserProfileComponent},
  {path: 'userFav', component: UserFavouritesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
