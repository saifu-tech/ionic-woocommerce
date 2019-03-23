import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MenuPage } from '../menu/menu';
import * as WC from 'woocommerce-api';
/**
 * Generated class for the ProductPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-product',
  templateUrl: 'product.html',
})
export class ProductPage {
	homePage: any;
	WooCommerce:any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  	this.homePage = MenuPage;
  	 this.WooCommerce = WC({
  url:"http://wordpress.findfastsolutions.in/",

             consumerKey: "ck_77e9d79f4e3bab373cf479e242f062e3cc390a07",
             consumerSecret: "cs_efc868206e23cc22bce21021c665baf7dfcf92b8"
 });
  	 this.WooCommerce.getAsync("products/categories").then((data)=>{
  	 	console.log(JSON.parse(data.body).products_categories);
  	 	console.log("hi");
  	 },(err)=>{
  	 	console.log(err)

  	 })

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductPage');
  }

}
