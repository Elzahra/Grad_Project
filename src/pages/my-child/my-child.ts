import { Component } from '@angular/core';
import {  NavController, NavParams ,MenuController} from 'ionic-angular';
import { Storage } from '@ionic/Storage';

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
temp:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public menuCtrl: MenuController, private storage: Storage) {
    //this.menuCtrl.enable(true, 'myMenu');
    //this.children= this.navParams.data.childs;
    storage.get('parent').then((val) => {
    console.log('Your age is', val);
  });


  }

  ionViewWillEnter(){

  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad MyChildPage');
    this.temp=this.navParams.data.childs;

    console.log(this.temp);
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
