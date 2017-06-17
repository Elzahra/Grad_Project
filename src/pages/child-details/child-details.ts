import { Component } from '@angular/core';
import { NavController, NavParams,AlertController,ToastController  } from 'ionic-angular';
import { SetSchedulePage } from '../set-schedule/set-schedule';
import { StatisticsPage } from '../statistics/statistics';
import { ChildMapPage } from '../child-map/child-map';
import { TrackApi, IParent, Role } from '../shared/track-api.service'
import { Storage } from '@ionic/Storage';
import {MyChildPage} from '../my-child/my-child';
//
@Component({
  selector: 'page-child-details',
  templateUrl: 'child-details.html',
})
export class ChildDetailsPage {
  child:any;
  childMonTab: any = ChildMapPage;
  statisticsTab: any = StatisticsPage;
  shecdualTab: any = SetSchedulePage;
  //
  viewflag:boolean=true;
  //
  constructor(public navCtrl: NavController,
   public navParams: NavParams,
   private storage: Storage,
   private alertCtrl: AlertController,
   private trackapi:TrackApi,
   private toastCtrl: ToastController) {
    this.child=this.navParams.data;
    console.log("navParams",this.navParams.data);
    console.log("ChildDetailsPage",this.child);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChildDetailsPage');
  }
  //
  GoToSchedule()
  { this.navCtrl.push(SetSchedulePage); }
  //
  GoToStatistics()
  { this.navCtrl.push(StatisticsPage); }

  goHome(){
    this.navCtrl.popToRoot();
  }
//
  removeChild(){


    let alert = this.alertCtrl.create({
    title: 'Confirm purchase',
    message: 'Are you sure you want to delete this child ?',
    buttons: [
      {
        text: 'Cancel',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      },
      {
        text: 'delete',
        handler: () => {
          console.log('Delete clicked');
          this.storage.get('child').then((val)=>{
              console.log("child val >>>>>",val);
              let prnt_id=val.parent_Id;
              this.trackapi.DeleteChild(val.id).subscribe(data=>{
                 this.trackapi.getParentsById(prnt_id).subscribe(Pdata=>{  
                    console.log("parent val <<<<<<<<>>>>>",Pdata);                                      
                    this.storage.set('parent', Pdata);        
                    this.navCtrl.popToRoot();
                    //
                     let toast = this.toastCtrl.create({
                message: 'Your child is deleted successfully',
                duration: 2000,
                position: 'middle'
              });
              toast.onDidDismiss(() => {
                console.log('Dismissed toast');
              });
              toast.present();

                 });//getparent     
              })//deletechild              
          })//storage
        }
      }
    ]
  });
  alert.present();

  }
}

