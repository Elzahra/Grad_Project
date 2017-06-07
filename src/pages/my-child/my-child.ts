import { Component } from '@angular/core';
import {  NavController, NavParams ,MenuController} from 'ionic-angular';
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
children:Array<any>=[];
  constructor(public navCtrl: NavController, public navParams: NavParams,public menuCtrl: MenuController) {
    //this.menuCtrl.enable(true, 'myMenu');
    this.children= this.navParams.data.childs;
    console.log(this.navParams.data);
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
//
openMenu() {
   this.menuCtrl.enable(true, 'myMenu');
 }

}
