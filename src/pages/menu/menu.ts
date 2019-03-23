import { Component, ViewChild} from '@angular/core';
import { IonicPage, NavController, NavParams, Slides  } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import * as WC from 'woocommerce-api';
import { ProductdetailsPage } from '../productdetails/productdetails';
import { Storage } from '@ionic/storage';
/**
 * Generated class for the MenuPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

 @IonicPage()
 @Component({
     selector: 'page-menu',
     templateUrl: 'menu.html',
 })
 export class MenuPage {

     WooCommerce:any;
     products:any[];
     page:number;
     moreproducts:any[];
     categories:any[];

     @ViewChild('productSlides') productSlides:Slides;
      loggedIn: boolean;
  user: any;
     constructor(public navCtrl: NavController, public navParams: NavParams,private toastCtrl: ToastController, public storage: Storage
         ) {

         this.page =2;
         this .categories = [];
         this.user = {};
         this.WooCommerce = WC({
             url:"http://wordpress.findfastsolutions.in/",
           

             consumerKey: "ck_77e9d79f4e3bab373cf479e242f062e3cc390a07",
             consumerSecret: "cs_efc868206e23cc22bce21021c665baf7dfcf92b8"
             
         });
         this.loadMoreproducts(null);

         this.WooCommerce.getAsync("products").then((data) =>{
             console.log(JSON.parse(data.body));
             this.products = JSON.parse(data.body).products;
         },(err) =>{
             console.log(err)
         });
         this.WooCommerce.getAsync("products/categories").then((data)=>{
             console.log(JSON.parse(data.body).product_categories);
             let temp:any[] = JSON.parse(data.body).product_categories;
             for(let i=0; i<temp.length; i++){
                 if(temp[i].parent == 0){
                     this.categories.push(temp[i]);
                 }
             }
             let test =this.categories;
             console.log(test);
         },(err)=>{
             console.log(err)

         })
     }
 ionViewDidEnter() {

    this.storage.ready().then(() => {
      this.storage.get("userLoginInfo").then((userLoginInfo) => {

        if (userLoginInfo != null) {

         // console.log("User logged in...");
          this.user = userLoginInfo.user;
         // console.log(this.user);
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


     ionViewDidload(){
         setInterval(()=>{
             if(this.productSlides.getActiveIndex() ==this.productSlides.length() -1)
                 this.productSlides.slideTo(0);
             this.productSlides.slideNext();



         }, 3000)
     }


     loadMoreproducts(event){
         if(event == null){
             this.page = 2;
             this.moreproducts = [];
         }
         else
             this.page ++;
         this.WooCommerce.getAsync("products?page=" + this.page).then((data) =>{
             console.log(JSON.parse(data.body));
             this.moreproducts = this.moreproducts.concat(JSON.parse(data.body).products);
             if(event != null)
             {
                 event.complete();
             }

             if(JSON.parse(data.body).products.length < 10){
                 event.enable(false);
                 this.toastCtrl.create({
                     message: " No more Products",
                     duration: 5000
                 }).present();
             }

         },(err) =>{
             console.log(err)
         })

     }

     openproductspage(product){
         this.navCtrl.push(ProductdetailsPage,{"product":product});
     }
 }
