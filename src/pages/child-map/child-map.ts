import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/Storage';
import * as io from 'socket.io-client'
import {TrackApi,IHistory} from '../shared/track-api.service'

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

    historyObj:IHistory={
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
  locationFlag:any;
  speed:number=0;
  childObj: any = {};
  selectedParent: any = {};
  socket: any;
  
  messages: Array<string>=[];
  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage, private loadingCtrl: LoadingController,
    private trackApi:TrackApi
  ) {
    console.log("constructor")
    console.log("ChildMapPage params>>>", this.navParams.data);
    this.childObj = this.navParams.data;
    storage.get('parent').then((val) => {
      // console.log('Your name is', val);
      this.selectedParent = val;

      // console.log('Your name is', val.fname);
    });



  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChildMapPage');
  }
  ionViewWillEnter() {
    this.socket = io.connect("http://realtimetrack.eu-2.evennode.com/");
    this.socket.on('connect', () => {
      console.log("from parent app", this.selectedParent.id);
      console.log("from parent app>>Obj", this.selectedParent);

      // write on stream !! Event "JOIN"
      this.socket.emit('joinParent', this.selectedParent.id);
    })
    this.socket.on('message', location => {
      //this.messages.push(data);
<<<<<<< HEAD
      console.log("message latitude>>>>",data.latitude)
      this.locationFlag=data;
      this.lat=data.latitude;
      this.lng=data.longitude;
      this.speed= data.speed ? data.speed*3.6 : 0
=======
      console.log("message latitude>>>>",location.latitude)
      
      this.historyObj.accuracy=location.accuracy;
       this.historyObj.altitude=location.altitude;
       this.historyObj.altitudeAccuracy=location.altitudeAccuracy;
       this.historyObj.bearing=location.bearing;
       this.historyObj.child_Id=this.childObj.id;
       this.historyObj.coords.accuracy=location.coords.accuracy;
       this.historyObj.coords.altitude=location.coords.altitude;
       this.historyObj.coords.altitudeAccuracy=location.altitudeAccuracy;
       this.historyObj.coords.longitude=location.coords.longitude;
       this.historyObj.latitude=location.latitude;
       this.historyObj.longitude=location.longitude;
       this.historyObj.time=location.time;
       this.historyObj.serviceProvider=location.serviceProvider;
       this.historyObj.timestamp=location.timestamp;
       this.historyObj.viewFlag=true;
       this.trackApi.addHistory(this.historyObj).subscribe();
      this.locationFlag=location;
      this.lat=location.latitude;
      this.lng=location.longitude;
      this.speed= location.speed ? location.speed*3.6 : 0
>>>>>>> a76ac8c228670c8382b44083ceff37455d784e89
      
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
