import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TopBarComponent } from './components/top-bar/top-bar.component';
import { CurrenciesComponent } from './components/currencies/currencies.component';
import { CryptocurrenciesComponent } from './components/cryptocurrencies/cryptocurrencies.component';
import { MetalsComponent } from './components/metals/metals.component';
import { StockComponent } from './components/stock/stock.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { SignUpPageComponent } from './components/sign-up-page/sign-up-page.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { UserFavouritesComponent } from './components/user-favourites/user-favourites.component';
import { HttpClientModule } from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import { SearchBarComponent } from './shared/search-bar/search-bar.component';

@NgModule({
  declarations: [
    AppComponent,
    TopBarComponent,
    CurrenciesComponent,
    CryptocurrenciesComponent,
    MetalsComponent,
    StockComponent,
    LandingPageComponent,
    LoginPageComponent,
    SignUpPageComponent,
    UserProfileComponent,
    UserFavouritesComponent,
    SearchBarComponent
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
