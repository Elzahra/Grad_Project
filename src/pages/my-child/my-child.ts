import { Component } from '@angular/core';
import { NavController, NavParams, MenuController, LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/Storage';
import { ChildDetailsPage } from '../child-details/child-details';
import { TrackApi, IParent, Role } from '../shared/track-api.service'
@Component({
  selector: 'page-my-child',
  templateUrl: 'my-child.html',
})
export class MyChildPage {
  children: Array<any> = [];
  selectedParent: any={};
  temp: any;
  constructor(public navCtrl: NavController, 
  public navParams: NavParams,
   public menuCtrl: MenuController,
    private storage: Storage, 
       private trackapi:TrackApi,
    private loadingCtrl: LoadingController) {
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
        console.log("parent val", val);
        this.selectedParent = val;
        this.children = this.selectedParent.childs;
        loader.dismiss();
      });
    })
  }
  ////////////////////////////////
  ionViewDidLoad() {
//       let loader = this.loadingCtrl.create({
//       content: 'Loading...',
      
//     });
//     loader.present().then(() => {
//       this.storage.get('parent').then((val) => {
// //this.trackapi.getParentsById(val.id).subscribe(Pdata=>{
//         this.selectedParent = val;
//         this.children = this.selectedParent.childs;
//        loader.dismiss();
// //})
      

//       });
//     })
  }
  //
  ItemChild($event, item) {
    console.log("child object",item);
    this.storage.set('child',item);
    this.navCtrl.push(ChildDetailsPage,item);   
  }
  //
  openMenu() {
    this.menuCtrl.enable(true, 'myMenu');
  }

}
