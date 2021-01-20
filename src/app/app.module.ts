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

@NgModule({
  declarations: [
    AppComponent,
    TopBarComponent,
    CurrenciesComponent,
    CryptocurrenciesComponent,
    MetalsComponent,
    StockComponent,
    LandingPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
