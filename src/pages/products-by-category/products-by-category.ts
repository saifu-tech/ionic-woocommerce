import { Component,NgZone  } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as WC from 'woocommerce-api';
import{ ProductdetailsPage } from '../productdetails/productdetails';
/**
 * Generated class for the ProductsByCategoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-products-by-category',
  templateUrl: 'products-by-category.html',
})
export class ProductsByCategoryPage {
	 WooCommerce:any;
     product:any = [];
     page:number;
     categories:any;

  constructor(public zone: NgZone,public navCtrl: NavController, public navParams: NavParams) {

  	this.page = 1;
  	this.categories = this.navParams.get('categories');
    this.WooCommerce = WC({
        url:"http://wordpress.findfastsolutions.in/",

             consumerKey: "ck_77e9d79f4e3bab373cf479e242f062e3cc390a07",
             consumerSecret: "cs_efc868206e23cc22bce21021c665baf7dfcf92b8"
         });

   
      this.loade();
    	console.log(this.product.length); 
  }

  loade(){

  	this.WooCommerce.getAsync("products?filter[categories]=" +this.categories).then((data) =>{
             let temp	  = JSON.parse(data.body);
           	 this.zone.run(() => {
                      	this.product = temp.products;
               });
           	console.log(this.product.length);
         },(err) =>{
             console.log(err)
         });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductsByCategoryPage');
  }
loadMoreproducts(event){
	this.page++;
	console.log("Getting page" +this.page);
	this.WooCommerce.getAsync("products?filter[categories]=" +this.categories +"&page=" + this.page).then((data) =>{
		let temp =(JSON.parse(data.body).products);
		this.product = this.product.concat(JSON.parse(data.body).products)
		console.log(this.product);
		event.complete();
		if (temp.length < 10)
			event.enable(false);

	})
}
openproductspage(product){
         this.navCtrl.push(ProductdetailsPage,{"product":product});
     }

}
