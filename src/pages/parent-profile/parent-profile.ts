import { Component,OnInit } from '@angular/core';
import {  NavController, NavParams } from 'ionic-angular';
import { TrackApi, IParent } from '../shared/track-api.service';

@Component({
  selector: 'page-parent-profile',
  templateUrl: 'parent-profile.html',
})


export class ParentProfilePage  {



  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ParentProfilePage');
  }

}
