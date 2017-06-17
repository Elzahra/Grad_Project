import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/Storage';
import * as io from 'socket.io-client'

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
  childObj: any = {};
  selectedParent: any = {};
  socket: any;
  messages: Array<string>=[];
  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage, private loadingCtrl: LoadingController) {
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
    this.socket.on('message', data => {
      //this.messages.push(data);
      console.log("message>>>>",data)
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
