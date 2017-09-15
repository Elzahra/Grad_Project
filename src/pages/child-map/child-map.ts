import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/Storage';
import * as io from 'socket.io-client'
import { TrackApi, IHistory } from '../shared/track-api.service'
import * as _ from 'lodash';
/**
 * Generated class for the ChildMapPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-child-map',
  templateUrl: 'child-map.html',
})
export class ChildMapPage {

  historyObj: IHistory = {
    serviceProvider: "",
    debug: true,
    time: 0,
    accuracy: 0,
    speed: 0,
    longitude: 0,
    latitude: 0,
    altitude: 0,
    altitudeAccuracy: 0,
    bearing: 0,
    timestamp: 0,
    child_Id: 0,
    coords: {
      latitude: 0,
      longitude: 0,
      altitude: 0,
      speed: 0,
      accuracy: 0,
      altitudeAccuracy: 0,
      heading: 0
    },
    viewFlag: true,
  }
  // google maps zoom level
  zoom: number = 18;

  // initial center position for the map
  lat: number = 51.673858;
  lng: number = 7.815982;
  locationFlag: any;
  speed: number = 0;
  childObj: any = {};
  selectedParent: any = {};
  socket: any;
  lastLoc: any = {};
  messages: Array<string> = [];
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private storage: Storage,
    private loadingCtrl: LoadingController,
    private trackApi: TrackApi
  ) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChildMapPage');
  }
  ionViewWillEnter() {
    console.log("constructor")
    console.log("ChildMapPage params>>>", this.navParams.data);
    this.childObj = this.navParams.data;
    this.storage.get('parent').then((val) => {
      // console.log('Your name is', val);
      this.selectedParent = val;
      this.socket = io.connect("https://realtimetrackservice.herokuapp.com/");
      this.socket.on('connect', () => {
        console.log("from parent app", this.selectedParent.id);
        console.log("from parent app>>Obj", this.selectedParent);
        this.socket.emit('joinParent', this.selectedParent.id);
      })

      //
      this.socket.on('message', location => {
        this.locationFlag = location;
        this.lat = location.latitude;
        this.lng = location.longitude;
        this.speed = location.speed * 3.6
        console.log("message latitude>>>>", location.latitude)
        // this.historyObj.child_Id = this.childObj.id;
        // this.historyObj.longitude = location.longitude;
        // this.historyObj.latitude = location.latitude;
        // this.historyObj.speed = location.speed;
        // this.historyObj.time = location.time;
        // this.historyObj.serviceProvider = location.serviceProvider;
        // this.historyObj.timestamp = location.timestamp;
        // this.historyObj.viewFlag = true;

        // this.trackApi.addHistory(this.historyObj).subscribe(data => {
        //   console.log(data);
        // });
      })




    });






    let loader = this.loadingCtrl.create({
      content: 'Loading..',

    })
    loader.present().then(() => {
      this.trackApi.getHistoryByCId(this.childObj.id).subscribe(data => {
        if (data) {
          this.lastLoc = _.first(data);
          console.log("LastLocation>>>", this.lastLoc);
          if (this.lastLoc != undefined) {
            this.locationFlag = this.lastLoc;
            this.lat = this.lastLoc.latitude;
            this.lng = this.lastLoc.longitude;
            this.speed = this.lastLoc.speed ? this.lastLoc.speed * 3.6 : 0;
          }

        }
        loader.dismiss();
      })

    })





  }
  send($event, data) {
    console.log("childObj", this.childObj.id)
    this.socket.emit("sendToChild", {
      to: this.childObj.id,
      data: data
    })
  }

}
