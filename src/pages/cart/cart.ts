import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { LoginPage } from '../login/login';
import { CheckoutPage } from '../checkout/checkout';
/** 
 * Generated class for the CartPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

 @IonicPage()
 @Component({
 	selector: 'page-cart',
 	templateUrl: 'cart.html',
 })
 export class CartPage {
 	cartitem: any[] = [];
 	total:any;
 	showemptycartmessage:boolean= false;
 	constructor(public navCtrl: NavController,private storage: Storage, public navParams: NavParams,public viewCtrl: ViewController) {
 		this.total = 0.0;
 		this.storage.ready().then(()=>{
 			this.storage.get("cart").then((data)=>{
 				this.cartitem = data;
 				console.log(this.cartitem);

 				if(this.cartitem.length > 0){

 					this.cartitem.forEach((item, index)=>{
 						this.total = this.total + (item.product.price * item.qty)
 					})
 				} else{

 					this.showemptycartmessage = true;
 				}
 			})
 		})
 	}
 	removefromcart(item, i){
 		let price =  item.product.price;
 		let qty = item.qty;
 		this.cartitem.splice(i, 1);
 		this.storage.set("cart", this.cartitem).then( ()=>{
 			this.total = this.total - (price * qty);
 		})
 		if(this.cartitem.length == 0 ){
 			this.showemptycartmessage = true;
 		}
 	}
 	closemodal(){
 		this.viewCtrl.dismiss();
 	}
 	ionViewDidLoad() {
 		console.log('ionViewDidLoad CartPage');
 	}

 	checkout(){

this.storage.get("userLoginInfo").then( (data) => {
      if(data != null){
        this.navCtrl.setRoot(CheckoutPage)
      } else {
       // this.navCtrl.push('Login', {next: 'Checkout'})
       this.navCtrl.setRoot(LoginPage,{next:CheckoutPage})
      }
    })


 	}

 }
