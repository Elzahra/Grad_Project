import { Component } from '@angular/core';
import {  NavController, NavParams } from 'ionic-angular';
import { TrackApi } from '../shared/track-api.service'
/**
 * Generated class for the SignupPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  parent:any = {
    "lname": "Zima",
    "fname": "Zema",
    "email": "Zima@iti.com",
    "password": "1544202",
    "imageUrl": null,
    "telephone": "01012109629",
    "address": {
      "street": "Ay haga",
      "city": "Ay heta",
      "country": "Egypt"
    }
    
  }
  constructor(public navCtrl: NavController, public navParams: NavParams, private trackApi:TrackApi) {
    
  }
  

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
    
  }

doWork(){
  this.trackApi.addParent(this.parent).subscribe(data=>{
    console.log("data from signUp: "+data)
  })
}
}
