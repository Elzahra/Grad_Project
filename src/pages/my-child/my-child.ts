import { Component } from '@angular/core';
import { Platform, NavController, NavParams, MenuController, LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/Storage';
import { ChildDetailsPage } from '../child-details/child-details';
import { TrackApi} from '../shared/track-api.service'
//import { Push } from '@ionic/cloud-angular'
@Component({
  selector: 'page-my-child',
  templateUrl: 'my-child.html',
})
export class MyChildPage {
  children: Array<any> = [];
  selectedParent: any = {};
  temp: any;
  constructor(
    private platform: Platform,
    public navCtrl: NavController,
    public navParams: NavParams,
    public menuCtrl: MenuController,
    private storage: Storage,
    private trackapi: TrackApi,
    private loadingCtrl: LoadingController
    //private push: Push
    ) {

    //
    platform.ready().then(() => {
      // push.register().then(token => {
      //   alert(JSON.stringify(token));
      // });
      // push.rx.notification().subscribe(msg => {

      // });
    })


  }

  ionViewWillEnter() {
    let loader = this.loadingCtrl.create({
      content: 'Loading...'
      //dismissOnPageChange: true
    });
    loader.present().then(() => {
      this.storage.get('parent').then((val) => {
        console.log("parent val", val);
        this.selectedParent = val;
        this.children = this.selectedParent.childs;
        loader.dismiss();
      });
    })
  }
  ////////////////////////////////
  ionViewDidLoad() {

  }
  //
  ItemChild($event, item) {
    console.log("child object", item);
    this.storage.set('child', item);
    this.navCtrl.push(ChildDetailsPage, item);
  }
  //
  openMenu() {
    this.menuCtrl.enable(true, 'myMenu');
  }

}
