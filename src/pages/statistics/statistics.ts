import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { Storage } from '@ionic/Storage';
import { TrackApi, IChild, Role, IParent,IHistory } from '../shared/track-api.service';

declare var google: any;

@Component({
  selector: 'page-statistics',
  templateUrl: 'statistics.html',
})
export class StatisticsPage {
placesService: any;
map: any;
historyList:IHistory[];
locId:number=0;
placedetails:any;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private loadingCtrl: LoadingController,
    private trackApi: TrackApi,
    private storage: Storage,
    private toastCtrl: ToastController) {
      storage.get('child').then((val) => {
        console.log("Statistics constructor",val);
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StatisticsPage');
  }

  ionViewWillEnter() {
      let loader = this.loadingCtrl.create({
      content: 'Loading...'
    });
 this.placesService = new google.maps.places.PlacesService(this.map);
    loader.present().then(() => {
      this.storage.get('child').then((val) => {
        console.log("ionViewWillEnter",val);
        console.log("value of child",val.id);
           this.trackApi.getHistoryByCId(val.id).subscribe(data => {              
              this.historyList=data
              console.log("this.historyObj data ",this.historyList);
              loader.dismiss();
           });
       });
    });
  }
  
}
