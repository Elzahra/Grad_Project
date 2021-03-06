import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { TrackApi, IParent, Role } from '../shared/track-api.service'
import { Storage } from '@ionic/Storage';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ParentProfilePage } from '../parent-profile/parent-profile';

import { Camera, CameraOptions } from '@ionic-native/camera';
import firebase from 'firebase';

@Component({
  selector: 'page-edit-profile',
  templateUrl: 'edit-profile.html',
})

export class EditProfilePage {


  parentObj: IParent = {
    id: 0,
    fname: "",
    lname: "",
    email: "",
    address: {
      city: "",
      country: "",
      street: "",
    },
    password: "",
    imageUrl: "",
    telephone: "",
    userRole: Role.Parent,
    viewFlag: true
  };

  profileForm: FormGroup;

  fname: string = '';
  lname: string = '';
  email: string = ''
  password: string = '';
  telephone: string = '';
  address: string = '';
  street: string = '';
  city: string = '';
  country: string = '';
  selectedParent: any = [];
  private captureDataUrl: string = "";
  //////////////////////constructor
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private storage: Storage,
    private loadingCtrl: LoadingController,
    private trackApi: TrackApi,
    private toastCtrl: ToastController,
    public cam: Camera,
    private formBuilder: FormBuilder) {

    this.profileForm = this.formBuilder.group({
      fname: ['', Validators.compose([Validators.required, Validators.maxLength(15), Validators.pattern('[a-zA-Z ]*')])],
      lname: ['', Validators.compose([Validators.required, Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*')])],
      email: ['', Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$')])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(30)])],
      telephone: ['', Validators.compose([Validators.required, Validators.pattern('^01([0-9]*)$'), Validators.minLength(11), Validators.maxLength(11)])],
      street: ['', Validators.compose([Validators.minLength(1), Validators.maxLength(11)])],
      city: ['', Validators.compose([Validators.minLength(1), Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*')])],
      country: ['', Validators.compose([Validators.minLength(1), Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*')])]
    });
  }
  /////////////////
  ionViewWillEnter() {
    let loader = this.loadingCtrl.create({
      content: 'Loading...'
    });
    loader.present().then(() => {
      this.storage.get('parent').then((val) => {
        console.log("inside ionViewWillEnter edit parent profile", val);
        this.parentObj.id = val.id;
        this.fname = val.fname;
        this.lname = val.lname;
        this.email = val.email;
        this.password = val.password;
        this.telephone = val.telephone;
        this.street = val.address.street;
        this.city = val.address.city;
        this.country = val.address.country;
        this.captureDataUrl = val.imageUrl;
        loader.dismiss();
      });
    })
  }
  ///////////////////////////
  openGallery(): void {
    let cameraOptions = {
      sourceType: this.cam.PictureSourceType.SAVEDPHOTOALBUM,
      destinationType: this.cam.DestinationType.DATA_URL,
      quality: 100,
      targetWidth: 1000,
      targetHeight: 1000,
      encodingType: this.cam.EncodingType.JPEG,
      correctOrientation: true
    }
    this.cam.getPicture(cameraOptions).then(file_uri => {
      this.captureDataUrl = 'data:image/jpeg;base64,' + file_uri;
    }
      , (err) => {
        console.log(err)
      });
  }
  ///////////////////////////
  openCamera() {
    const cameraOptions: CameraOptions = {
      quality: 100,
      destinationType: this.cam.DestinationType.DATA_URL,
      encodingType: this.cam.EncodingType.JPEG,
      mediaType: this.cam.MediaType.PICTURE,
    };

    this.cam.getPicture(cameraOptions).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64:
      this.captureDataUrl = 'data:image/jpeg;base64,' + imageData;

    }, (err) => {
      // Handle error
    });
  }
  ///////////////////////////
  ionViewDidLoad() {
    console.log('ionViewDidLoad EditProfilePage');
  }
  ///////////////////////////
  DoneEditProfile() {
    console.log("inside DoneEditProfile method");
    let loader = this.loadingCtrl.create({
      content: 'Loading ...',
    });
    loader.present().then(() => {
      console.log("inside loader present");
      if (this.captureDataUrl != "") {
        console.log("inside captureDataUrl is not null");
        let storageRef = firebase.storage().ref();
        const filename = Math.floor(Date.now() / 1000);
        const imageRef = storageRef.child(`images/${filename}.jpg`);
        console.log("storageRef  ",storageRef);
        console.log("this.captureDataUrl ", this.captureDataUrl);
        imageRef.putString(this.captureDataUrl).then((snapshot) => {
          //, firebase.storage.StringFormat.DATA_URL
          console.log("snapshot ", snapshot.downloadURL);
          this.parentObj.fname = this.profileForm.value.fname;
          this.parentObj.lname = this.profileForm.value.lname;
          this.parentObj.email = this.profileForm.value.email;
          this.parentObj.password = this.profileForm.value.password;
          this.parentObj.telephone = this.profileForm.value.telephone;
          this.parentObj.userRole = Role.Parent;
          this.parentObj.viewFlag = true;
          if (storageRef.fullPath != "") {
            this.parentObj.imageUrl = snapshot.downloadURL;
          }
          else {
            this.parentObj.imageUrl = this.captureDataUrl;
          }
          this.parentObj.address.city = this.profileForm.value.city;
          this.parentObj.address.street = this.profileForm.value.street;
          this.parentObj.address.country = this.profileForm.value.country;
          console.log("inside this.parentObj", this.parentObj);
          this.ApiMethod(loader)
        });
      }
      else {
        this.parentObj.fname = this.profileForm.value.fname;
        this.parentObj.lname = this.profileForm.value.lname;
        this.parentObj.email = this.profileForm.value.email;
        this.parentObj.password = this.profileForm.value.password;
        this.parentObj.telephone = this.profileForm.value.telephone;
        this.parentObj.userRole = Role.Parent;
        this.parentObj.viewFlag = true;
        this.parentObj.address.city = this.profileForm.value.city;
        this.parentObj.address.street = this.profileForm.value.street;
        this.parentObj.address.country = this.profileForm.value.country;
        this.parentObj.imageUrl = this.captureDataUrl;

        this.ApiMethod(loader)
      }
    });//loader present
  }
  //////////////////////////////////////////////
  ApiMethod(loader) {
    this.trackApi.UpdateParent(this.parentObj).subscribe(data => {
      if (data) {
        console.log("inside update parent function", data);
        this.storage.clear();
        this.storage.set('parent', data);
        loader.dismiss();
        this.navCtrl.push(ParentProfilePage);

        let toast = this.toastCtrl.create({
          message: 'Your data is updated successfully',
          duration: 2500,
          position: 'middle'
        });
        toast.onDidDismiss(() => {
          console.log('Dismissed toast');
        });
        toast.present();
      }
    }, (err => {
      loader.dismiss();
      let toast;
      switch (err.status) {
        case 400:
          toast = this.toastCtrl.create({
            message: 'Invalid Data',
            duration: 2000,
            position: 'middle'
          });
          toast.present();
          break;
        case 404:
          toast = this.toastCtrl.create({
            message: 'Not Found',
            duration: 2500,
            position: 'middle'
          });
          toast.present();
          break;

        default:
          toast = this.toastCtrl.create({
            message: 'Connection TimeOut',
            duration: 2500,
            position: 'middle'
          });
          toast.present();
          break;
      }

    }));
  }
}//class
