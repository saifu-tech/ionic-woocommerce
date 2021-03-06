import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';


import { MenuPage } from '../pages/menu/menu';
import { ProductsByCategoryPage } from '../pages/products-by-category/products-by-category';
import{ ProductdetailsPage } from '../pages/productdetails/productdetails';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { IonicStorageModule } from '@ionic/storage';
import { CartPage } from '../pages/cart/cart';
import { SignupPage } from '../pages/signup/signup';
import { LoginPage } from '../pages/login/login';
import { HttpModule } from '@angular/http';
import {CheckoutPage } from '../pages/checkout/checkout';
@NgModule({
  declarations: [
    MyApp,

  
    MenuPage,
    ProductsByCategoryPage,
    ProductdetailsPage,
    CartPage,
    SignupPage,
    LoginPage,
    CheckoutPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,


    MenuPage,
    ProductsByCategoryPage,
    ProductdetailsPage,
    CartPage,
    SignupPage,
    LoginPage,
    CheckoutPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
