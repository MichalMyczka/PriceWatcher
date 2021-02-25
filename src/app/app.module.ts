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
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AngularFireModule} from '@angular/fire';
import { environment } from '../environments/environment';
import { FirebaseService } from './services/firebase.service';
import {AngularFireDatabaseModule} from '@angular/fire/database';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import { SearchComponent } from './shared/search/search.component';
import {NgParticlesModule} from 'ng-particles';

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
    SearchComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        FormsModule,
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFireDatabaseModule,
        AngularFirestoreModule.enablePersistence(),
        ReactiveFormsModule,
        NgParticlesModule
    ],
  providers: [FirebaseService],
  bootstrap: [AppComponent]
})
export class AppModule { }
