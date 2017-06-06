import { Component } from '@angular/core';
import {  NavController, NavParams,MenuController } from 'ionic-angular';
import { MyChildPage} from '../my-child/my-child';
import { MyApp } from '../../app/app.component';
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
    //this.menuCtrl.enable(false, 'myMenu');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
  //
  GoToMychild()
  {
    this.navCtrl.setRoot(MyChildPage);
    this.navCtrl.popToRoot();
  }

}
