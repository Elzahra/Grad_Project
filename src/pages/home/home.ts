import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {LoginPage} from'../login/login';
import {SignupPage} from'../signup/signup';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

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
