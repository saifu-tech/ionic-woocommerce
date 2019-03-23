import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, ModalController, Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import * as WC from 'woocommerce-api';



import { MenuPage } from '../pages/menu/menu';
import { SignupPage } from '../pages/signup/signup';
import { ProductsByCategoryPage } from '../pages/products-by-category/products-by-category';
import { LoginPage } from '../pages/login/login';
import { Storage } from '@ionic/storage';
import {CartPage } from '../pages/cart/cart';
import {CheckoutPage } from '../pages/checkout/checkout';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
   WooCommerce:any;
    products:any[];
       categories:any[];
  @ViewChild(Nav) nav: Nav;

  rootPage: any = MenuPage;
  
  pages: any = [];
  loggedIn: boolean;
  user: any;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen,public storage: Storage, public modalCtrl: ModalController ) {
    this.initializeApp();
    console.log("1");
 this .categories = [];
 this.user = {};
    // used for an example of ngFor and navigation
    this.pages = [
   
 
      { title: 'Home'},
      { title: 'Mens'}
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      console.log('hai');
       this.WooCommerce = WC({

   url:"http://wordpress.findfastsolutions.in/",
    consumerKey: "ck_77e9d79f4e3bab373cf479e242f062e3cc390a07",
             consumerSecret: "cs_efc868206e23cc22bce21021c665baf7dfcf92b8"
 });
       this.WooCommerce.getAsync("products/categories").then((data)=>{
             console.log(JSON.parse(data.body).product_categories);
             let temp:any[] = JSON.parse(data.body).product_categories;
             for(let i=1; i<temp.length; i++){
                 if(temp[i].parent == 0){
                     if(temp[i].slug == 'clothing'){
                       temp[i].icon = "shirt";
                     }
                     if(temp[i].slug == 'clothing'){
                       temp[i].icon = "shirt";
                     }
                     if(temp[i].slug == 'music'){
                       temp[i].icon = "musical-notes";
                     }
                     if(temp[i].slug == 'posters'){
                       temp[i].icon = "images";
                     }
                      

                     this.categories.push(temp[i]);
                 }
             }
             let test =this.categories;
             console.log(test);
             console.log('o');
         },(err)=>{
             console.log(err)

         })
    });
        this.storage.ready().then(() => {
      this.storage.get("userLoginInfo").then((userLoginInfo) => {

        if (userLoginInfo != null) {

          console.log("User logged in...");
          this.user = userLoginInfo.user;
          console.log(this.user);
          this.loggedIn = true;
        }
        else {
          console.log("No user found.");
          this.user = {};
          this.loggedIn = false;
        }

      })
    })

  }
 // ionViewDidEnter() {

 //    this.storage.ready().then(() => {
 //      this.storage.get("userLoginInfo").then((userLoginInfo) => {

 //        if (userLoginInfo != null) {

 //          console.log("User logged in...");
 //          this.user = userLoginInfo.user;
 //          console.log(this.user);
 //          this.loggedIn = true;
 //        }
 //        else {
 //          console.log("No user found.");
 //          this.user = {};
 //          this.loggedIn = false;
 //        }

 //      })
 //    })


 //  }
  openPage(page) {
    console.log(page)
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    let component:any;
    if(page.title == 'Home') {
      component = MenuPage;
    } 
    if(page.title == 'Mens') {
      component = MenuPage;
    }
    this.nav.setRoot(component);



  }

  openCategoryPage(categorie){
    this.nav.setRoot(ProductsByCategoryPage,{"categories":categorie})
  }

  openpage(){
    this.nav.setRoot(SignupPage);

  }

  loginmenu(){
     this.nav.setRoot(LoginPage);
  }

  logoutCart(){
     this.storage.remove("userLoginInfo").then(() => {
        this.user = {};
        this.loggedIn = false;
      })
  }

  cartpagedetails(){
    let modal = this.modalCtrl.create(CartPage);
      modal.present();
  }
}
