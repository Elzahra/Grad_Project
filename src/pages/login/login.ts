import { Component } from '@angular/core';
import {  NavController, NavParams } from 'ionic-angular';
import { MyChildPage} from '../my-child/my-child';

/**
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
  //
  GoToMychild()
  {
    this.navCtrl.push(MyChildPage);
  }

}
