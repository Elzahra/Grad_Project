import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { Storage } from '@ionic/Storage';
import { TrackApi, IHistory } from '../shared/track-api.service';

declare var google: any;

export interface marker {
  lat: number;
  lng: number;
  label?: string;
  speed:number;

}


@Component({
  selector: 'page-statistics',
  templateUrl: 'statistics.html',
})
export class StatisticsPage {
  markers: marker[] = [];
  placesService: any;
  lat: number;
  lng: number
  locId: number = 0;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private loadingCtrl: LoadingController,
    private trackApi: TrackApi,
    private storage: Storage,
    private toastCtrl: ToastController) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StatisticsPage');
  }

  ionViewWillEnter() {
    let loader = this.loadingCtrl.create({
      content: 'Loading...'
    });

    loader.present().then(() => {
      this.storage.get('child').then((val) => {
        console.log("ionViewWillEnter", val);
        console.log("value of child", val.id);
        this.trackApi.getHistoryByCId(val.id).subscribe(data => {
          this.lat = (data[0].latitude + data[1].latitude + data[2].latitude + data[3].latitude) / 4;
          this.lng = (data[0].longitude + data[1].longitude + data[2].longitude + data[3].longitude) / 4;
          this.markers = [
            {
              lat: data[0].latitude,
              lng: data[0].longitude,
              label: 'A',
              speed:data[0].speed
            },
            {
              lat: data[1].latitude,
              lng: data[1].longitude,
              label: 'B',
              speed:data[1].speed
            },
            {
              lat: data[2].latitude,
              lng: data[2].longitude,
              label: 'C',
              speed:data[2].speed

            },
            {
              lat: data[3].latitude,
              lng: data[3].longitude,
              label: 'D',
              speed:data[3].speed
            }
          ]

          loader.dismiss();
        });
      });
    });
  }

}
