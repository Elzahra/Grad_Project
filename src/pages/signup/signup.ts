import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/Storage';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { LoginPage } from '../login/login';
import firebase from 'firebase';

import { TrackApi, IParent, Role } from '../shared/track-api.service'

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
//
export class SignupPage {
  //
  private captureDataUrl: string = "";
  SignupForm: FormGroup;
  parentObj: IParent = {
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
  msg: string = "";
  afterUpload: string;
  isUnique:string="";
  //
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public cam: Camera,
    private loadingCtrl: LoadingController,
    private formBuilder: FormBuilder,

    private storage: Storage,
    private trackApi: TrackApi,
   
  ) {
    this.SignupForm = this.formBuilder.group({
      fname: ['', Validators.compose([Validators.minLength(2),Validators.maxLength(15), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
      lname: ['', Validators.compose([Validators.minLength(2),Validators.maxLength(15), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
      email: ['', Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$')])],  
      password: ['', Validators.compose([Validators.required,Validators.minLength(4)])],
      telephone: ['', Validators.compose([Validators.required, Validators.pattern('^01([0-9]*)$'),Validators.maxLength(11),Validators.minLength(11)])],
      address: ['', Validators.compose([Validators.required])]
    });
  }


  //
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
  //

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



  GoToAddChild() {

    let loader = this.loadingCtrl.create({
      content: 'Signing Up...',
      
    });
    loader.present().then(() => {
      if (this.captureDataUrl != "") {
        let storageRef = firebase.storage().ref();
        // Create a timestamp as filename
        const filename = Math.floor(Date.now() / 1000);

        // Create a reference to 'images/todays-date.jpg'
        const imageRef = storageRef.child(`images/${filename}.jpg`);

        imageRef.putString(this.captureDataUrl, firebase.storage.StringFormat.DATA_URL).then((snapshot) => {
          // Do something here when the data is succesfully uploaded!
          this.parentObj.fname = this.SignupForm.value.fname;
          this.parentObj.lname = this.SignupForm.value.lname;
          this.parentObj.email = this.SignupForm.value.email;
          this.parentObj.password = this.SignupForm.value.password;
          this.parentObj.telephone = this.SignupForm.value.telephone;
          this.parentObj.address.city = this.SignupForm.value.address;
          this.parentObj.imageUrl = snapshot.downloadURL;
          this.trackApi.validateEmail(this.SignupForm.value.email).subscribe(data => {
          if (data) {
            console.log("validateEmail>>>>",data)
            this.isUnique="This Email is Already Registered";
            this.msg="";
            loader.dismiss();
          }
          else {
            this.isUnique=""
            this.trackApi.addParent(this.parentObj).subscribe(data => {
              if (data) {
                loader.dismiss();
                this.navCtrl.push(LoginPage);
              }
              else {
                loader.dismiss();
                this.msg = 'Somting Went Wrong.. Try Again';
              }
            })
          }
        })
        });

      }
      else {
        this.parentObj.fname = this.SignupForm.value.fname;
        this.parentObj.lname = this.SignupForm.value.lname;
        this.parentObj.email = this.SignupForm.value.email;
        this.parentObj.password = this.SignupForm.value.password;
        this.parentObj.telephone = this.SignupForm.value.telephone;
        this.parentObj.address.city = this.SignupForm.value.address;
        this.parentObj.imageUrl = null;
        
           
            
        this.trackApi.validateEmail(this.SignupForm.value.email).subscribe(data => {
          if (data) {
           
            console.log("validateEmail>>>>",data)
            this.SignupForm.invalid;
            this.SignupForm.controls.email.valid
            this.isUnique="This Email is Already Registered";
            this.msg="";
            loader.dismiss();
          }
          else {
            this.isUnique=""
            
        this.trackApi.addParent(this.parentObj).subscribe(data => {
          if (data) {
            this.storage.clear();
            this.navCtrl.push(LoginPage);
            loader.dismiss();
          }
          else {
            this.msg = 'Somting Went Wrong.. Try Again';
            loader.dismiss();
          }
        })


          }



        })









      }

    })
  }
  //
  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');

  }

  // doWork(){
  //   this.trackApi.addParent(this.parent).subscribe(data=>{
  //     console.log("data from signUp: "+data)
  //   })
  // }
}
