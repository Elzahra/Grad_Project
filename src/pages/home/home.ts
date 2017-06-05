import { Component } from '@angular/core';
import { NavController,MenuController } from 'ionic-angular';
import {LoginPage} from'../login/login';
import {SignupPage} from'../signup/signup';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, public menuCtrl: MenuController) {
this.menuCtrl.enable(false, 'myMenu');
  }
//
GoToLogin()
{
  this.navCtrl.push(LoginPage);
}
//
GoToSignup()
{
  this.navCtrl.push(SignupPage);
}
}
