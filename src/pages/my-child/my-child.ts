import { Component } from '@angular/core';
import { NavController, NavParams, MenuController, LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/Storage';

import { ChildDetailsPage } from '../child-details/child-details';

@Component({
  selector: 'page-my-child',
  templateUrl: 'my-child.html',
})
export class MyChildPage {
  children: Array<any> = [];
  selectedParent: any={};
  temp: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public menuCtrl: MenuController, private storage: Storage, private loadingCtrl: LoadingController) {
    console.log("constractor");
    storage.get('parent').then((val) => {
      console.log('Your age is', val);
      this.children = val.childs;
      this.selectedParent = val;
    });


  }

  ionViewWillEnter() {
    // let loader = this.loadingCtrl.create({
    //   content: 'Loading...'
    //   //dismissOnPageChange: true
    // });
    // loader.present().then(() => {
    //   this.storage.get('parent').then((val) => {
    //     this.selectedParent = val;
    //     this.children = this.selectedParent.childs;
    //     loader.dismiss();
    //   });
    // })

  }
  ionViewDidLoad() {
      let loader = this.loadingCtrl.create({
      content: 'Loading...',
      dismissOnPageChange: true
    });
    loader.present().then(() => {
      this.storage.get('parent').then((val) => {
        this.selectedParent = val;
        this.children = this.selectedParent.childs;
       loader.dismiss();
      });
    })
  }
  //
  ItemChild($event, item) {
    this.navCtrl.push(ChildDetailsPage,item);
  }
  //
  openMenu() {
    this.menuCtrl.enable(true, 'myMenu');
  }

}
