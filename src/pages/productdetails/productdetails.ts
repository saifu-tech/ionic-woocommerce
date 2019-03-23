import { Component } from '@angular/core';
import { ToastController } from 'ionic-angular';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import * as WC from 'woocommerce-api';
import { ModalController, ViewController } from 'ionic-angular';
import { CartPage } from '../cart/cart';

/**
 * Generated class for the ProductdetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

 @IonicPage()
 @Component({
 	selector: 'page-productdetails',
 	templateUrl: 'productdetails.html',
 })
 export class ProductdetailsPage {

 	product:any;
 	WooCommerce:any;
 	reviews: any[] = [];

 	constructor(public navCtrl: NavController,private toastCtrl: ToastController,public modalCtrl: ModalController, public navParams: NavParams,private storage: Storage) {
 		this.product = this.navParams.get("product");
 		console.log(this.product);

 		this.WooCommerce = WC({
 			 url:"http://wordpress.findfastsolutions.in/",

              consumerKey: "ck_77e9d79f4e3bab373cf479e242f062e3cc390a07",
             consumerSecret: "cs_efc868206e23cc22bce21021c665baf7dfcf92b8"
 		});

 		// this.product.getAsync('products/'+this.product.id + '/review').then((data)=> {
 		// 	this.reviews = JSON.parse(data.body).product_reviews;
 		// 		console.log(this.reviews);

 		// 	 		},(err)=>{
 		// 	 			console.log(err);
 		// 	 		});
 		 this.WooCommerce.getAsync("products/"+this.product.id + "/reviews").then((data) =>{
             this.reviews = JSON.parse(data.body).product_reviews;
 				console.log(this.reviews);
         },(err) =>{
             console.log(err)
         });

 	}
 	addtocart(product){

 		this.storage.get("cart").then((data)=>{
 			if(data == null || data.length == 0){
 				data = [];
 				data.push({
 					"product":product,
 					"qty":1,
 					"amount":parseFloat(product.price)
 				})	
 			} else{
 				let added = 0;
 				for(let i = 0 ; i<data.length; i++){
 					if(product.id == data[i].product.id){
 						console.log("product is already in the cart");
 						let qty = data[i].qty;
 						data[i].qty =  qty+1;
 						data[i].amount = parseFloat(data[i].amount) + parseFloat(data[i].product.price);
 						added = 1;
 					}
 				}
 				if(added == 0){
 					data.push({
 						"product":product,
 						"qty":1,
 						"amount":parseFloat(product.price)
 					})	
 				}
 			}
 			this.storage.set("cart",data).then( ()=>{
 				console.log("cart Updated");
 				console.log(data);

 				this.toastCtrl.create({
 					message: "Cart Updated",
 					duration:3000
 				}).present();
 			})

 		});

 	}

 	opencart(){
 			this.modalCtrl.create(CartPage).present();
 		} 
 	ionViewDidLoad() {
 		console.log('ionViewDidLoad ProductdetailsPage');
 	}


 }
