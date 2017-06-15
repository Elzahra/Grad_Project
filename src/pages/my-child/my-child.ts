import { Component } from '@angular/core';
import { NavController, NavParams, MenuController, LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/Storage';
import { ChildDetailsPage } from '../child-details/child-details';
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
  children: Array<any> = [];
  selectedParent: any;
  temp: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public menuCtrl: MenuController, private storage: Storage, private loadingCtrl: LoadingController) {
    console.log("constractor");
    storage.get('parent').then((val) => {
      console.log('Your aaaaaage is', val);
      this.children = val.childs;
      this.selectedParent = val;
    });
  }

  ionViewWillEnter() {
    let loader = this.loadingCtrl.create({
      content: 'Loading...'
      //dismissOnPageChange: true
    });
    loader.present().then(() => {
      this.storage.get('parent').then((val) => {
        this.selectedParent = val;
        this.children = this.selectedParent.childs;
        loader.dismiss();
      });
    })

  }
  ionViewDidLoad() {
    console.log("didLaod");
  }
  //
  ItemChild(event, item) {
    this.navCtrl.push(ChildDetailsPage, {
      item: item
    });
  }
  //
  openMenu() {
    this.menuCtrl.enable(true, 'myMenu');
  }

}
