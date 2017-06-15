import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { TrackApi, IParent } from '../shared/track-api.service'
import { Storage } from '@ionic/Storage';
import { EditProfilePage } from '../edit-profile/edit-profile';
@Component({
  selector: 'page-parent-profile',
  templateUrl: 'parent-profile.html',
})

export class ParentProfilePage {
  fname: string = '';
  lname: string = '';
  email: string = ''
  password: string = '';
  telephone: string = '';
  street: string = '';
  city: string = '';
  country: string = '';
  selectedParent: any = [];
  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage, private loadingCtrl: LoadingController) {
    storage.get('parent').then((val) => {
      console.log('parent profile ', val);
      this.selectedParent = val;
    });
  }
  ionViewWillEnter() {
    let loader = this.loadingCtrl.create({
      content: 'Loading...'
    });
    loader.present().then(() => {
      this.storage.get('parent').then((val) => {
        this.fname = val.fname;
        this.lname = val.lname;
        this.email = val.email;
        this.password = val.password;
        this.telephone = val.telephone;
        this.street = val.address.street;
        this.city = val.address.city;
        this.country = val.address.country;
        loader.dismiss();
      });
    })
  }
  EditProfile() {
    this.navCtrl.push(EditProfilePage);
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ParentProfilePage');
  }

}
