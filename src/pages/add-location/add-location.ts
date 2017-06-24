import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the AddLocationPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-add-location',
  templateUrl: 'add-location.html',
})
export class AddLocationPage {
  location;
  lat:number;
  lng:number;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.lat=navParams.data.data.message.lat;
    this.lng=navParams.data.data.message.lng;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddLocationPage');
  }

}
