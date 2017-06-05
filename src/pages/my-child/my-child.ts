import { Component } from '@angular/core';
import {  NavController, NavParams } from 'ionic-angular';
import {LoginPage} from'../login/login';
import {ChildDetailsPage} from'../child-details/child-details';
/**
 * Generated class for the MyChildPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-my-child',
  templateUrl: 'my-child.html',
})
export class MyChildPage {
children:Array<string>=[]
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.children=["Child1","Child2","Child3","Child4"];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyChildPage');
  }
  //
  ItemChild(event,item)
  {
      this.navCtrl.push(ChildDetailsPage, {
      item: item
  });
  } 
}
