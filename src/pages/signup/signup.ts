import { Component } from '@angular/core';
import {  NavController, NavParams,LoadingController } from 'ionic-angular';
import { GalleryPage } from '../gallery/gallery';
import {Camera,CameraOptions} from '@ionic-native/camera';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import {AddChildPage} from '../add-child/add-child';

import { TrackApi } from '../shared/track-api.service'
/**
 * Generated class for the SignupPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */


@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
//
export class SignupPage {
<<<<<<< HEAD
//
 private imageSrc: string;
 SignupForm:FormGroup;
 msg: string = "";
//
  constructor(public navCtrl: NavController, 
  public navParams: NavParams,
  public cam:Camera,
  private loadingCtrl: LoadingController,
  private formBuilder: FormBuilder,
  private trackApi:TrackApi
  ) {
    this.SignupForm=this.formBuilder.group({
      fname:['',Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
      lname:['',Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
      email: ['', Validators.compose([Validators.required,Validators.pattern('^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$')])],
      password: ['',Validators.required],
      telephone:['',Validators.compose([Validators.required,Validators.pattern('^(0|[1-9][0-9]*)$'),Validators.minLength(1),Validators.maxLength(11)])],
      address:['',Validators.compose([Validators.required])]
   });
  }
//
private openGallery (): void {
   let cameraOptions = {
    sourceType: this.cam.PictureSourceType.PHOTOLIBRARY,
    destinationType: this.cam.DestinationType.FILE_URI,      
    quality: 100,
    targetWidth: 1000,
    targetHeight: 1000,
    encodingType: this.cam.EncodingType.JPEG,      
    correctOrientation: true      
  }
 this.cam.getPicture(cameraOptions).then(file_uri=>this.imageSrc=file_uri,err=>console.log(err));
}
//
GoToAddChild(){
  let fname=this.SignupForm.value.fname;
  let lname=this.SignupForm.value.lname;
  let email=this.SignupForm.value.email;
  let password=this.SignupForm.value.password;
  let telephone=this.SignupForm.value.telephone;
  let address=this.SignupForm.value.address;
  let loader = this.loadingCtrl.create({
      content: 'Signing Up...',
      duration:5000
    });
    loader.present().then(() => {
      this.navCtrl.push(AddChildPage);
      loader.dismiss();
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
