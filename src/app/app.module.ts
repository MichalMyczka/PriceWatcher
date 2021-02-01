import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { CurrenciesComponent } from './currencies/currencies.component';
import { CryptocurrenciesComponent } from './cryptocurrencies/cryptocurrencies.component';
import { MetalsComponent } from './metals/metals.component';
import { StockComponent } from './stock/stock.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { SignUpPageComponent } from './sign-up-page/sign-up-page.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserFavouritesComponent } from './user-favourites/user-favourites.component';
import { HttpClientModule } from '@angular/common/http';

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
    UserFavouritesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
