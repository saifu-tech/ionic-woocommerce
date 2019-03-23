import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import * as WC from 'woocommerce-api';
import { ToastController } from 'ionic-angular';
/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

 @IonicPage()
 @Component({
   selector: 'page-signup',
   templateUrl: 'signup.html',
 })
 export class SignupPage {


   newuser:any ={};
   billing_shipping_same:boolean;
   WooCommerce:any;
   constructor(public navCtrl: NavController, public navParams: NavParams, public toastCtrl: ToastController, public alertCtrl: AlertController) {
     this.newuser.billing_address = {};
     this.newuser.shipping_address = {};
     this.billing_shipping_same =false;

     this.WooCommerce = WC({
       url:"http://wordpress.findfastsolutions.in/",

             consumerKey: "ck_77e9d79f4e3bab373cf479e242f062e3cc390a07",
             consumerSecret: "cs_efc868206e23cc22bce21021c665baf7dfcf92b8"
       
      
     });

   }

   ionViewDidLoad() {
     console.log('ionViewDidLoad SignupPage');
   }
   setbillingToshipping(){
     this.billing_shipping_same = !this.billing_shipping_same;
   }

   checkEmail(){
     let validEmail = false;
     let reg =  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
     if(reg.test(this.newuser.email)){
       console.log(this.newuser.email);

       this.WooCommerce.getAsync("customers/email/" + this.newuser.email).then( (data) =>{
         let res =(JSON.parse(data.body));
         if(res.errors){
           validEmail = true;
           this.toastCtrl.create({
             message: " Congratulation email is good to go",
             duration: 5000
           }).present();
         } else{

           validEmail = false;
           this.toastCtrl.create({
             message: " Email already register Please check",
             showCloseButton:true
           }).present();
         }
         console.log(validEmail);
       });

     } else{
       validEmail = false;
       this.toastCtrl.create({
         message: " Invalid email please check",
         showCloseButton:true
       }).present();
       console.log(validEmail);
     }
     
   }
   signup() {

       let customerData = {
         customer : {}
       }
       
       customerData.customer = {
         "email": this.newuser.email,
         "first_name": this.newuser.first_name,
         "last_name": this.newuser.last_name,
         "username": this.newuser.username,
         "password": this.newuser.password,
         "billing_address" :{
           "first_name": this.newuser.first_name,
           "last_name": this.newuser.last_name,
           "company" : "",
           "address_1": this.newuser.billing_address.address_1,
           "address_2": this.newuser.billing_address.address_2,
           "country": this.newuser.billing_address.country,
           "state": this.newuser.billing_address.state,
           "city": this.newuser.billing_address.city,
           "postcode": this.newuser.billing_address.postcode,
           "email": this.newuser.email,
           "phone": this.newuser.billing_address.phone
         },
         "shipping_address":{
           "first_name": this.newuser.first_name,
           "last_name": this.newuser.last_name,
           "company" : "",
           "address_1": this.newuser.shipping_address.address_1,
           "address_2": this.newuser.shipping_address.address_2,
           "country": this.newuser.shipping_address.country,
           "state": this.newuser.shipping_address.state,
           "city": this.newuser.shipping_address.city,
           "postcode": this.newuser.shipping_address.postcode,
         }
       }

       if(this.billing_shipping_same){
        this.newuser.shipping_address = this.newuser.shipping_address;
      }


          this.WooCommerce.postAsync('customers', customerData).then( (data) => {

        let response = (JSON.parse(data.body));

        if(response.customer){
          this.alertCtrl.create({
            title: "Account Created",
            message: "Your account has been created successfully! Please login to proceed.",
            buttons: [{
              text: "Login",
              handler: ()=> {
                //TODO
              }
            }]
          }).present();
        } else if(response.errors){
          this.toastCtrl.create({
            message: response.errors[0].message,
            showCloseButton: true
          }).present();
        }

      })

    }

}
