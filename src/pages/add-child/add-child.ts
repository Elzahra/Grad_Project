import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import firebase from 'firebase';
import { Storage } from '@ionic/Storage';
import { TrackApi, IChild, Role, IParent } from '../shared/track-api.service'


/**
 * Generated class for the AddChildPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-add-child',
  templateUrl: 'add-child.html',
})
export class AddChildPage {

  
  private captureDataUrl: string = "";
  SignupForm: FormGroup;
  ChildObj: IChild = {
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
    userRole: Role.Child,
    parent_Id:0,
    viewFlag: true

  };
  msg: string = "";
  afterUpload: string;
  parentObj:any;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public cam: Camera,
    private loadingCtrl: LoadingController,
    private formBuilder: FormBuilder,
    private trackApi: TrackApi,
    private storage: Storage
    ){
      this.SignupForm = this.formBuilder.group({
      fname: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
      //lname: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
      email: ['', Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$')])],
      password: ['', Validators.required],
      telephone: ['', Validators.compose([Validators.required, Validators.pattern('^01([0-9]*)$'), Validators.minLength(1), Validators.maxLength(11)])],
      city: ['', Validators.compose([Validators.required])],
      street:['', Validators.compose([Validators.required])],
      country:['', Validators.compose([Validators.required])]

    });
      storage.get('parent').then((val) => {
            this.parentObj=val;
            console.log("Parent ID: ",this.parentObj.id);
        });


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddChildPage');
  }

////////////////////////////////////////////////////
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
/////////////////////////////////////////////////////////

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
//////////////////////////////////////////////////////////////////

  GoToAddChild() {
    let loader = this.loadingCtrl.create({
      content: 'Signing Up...',
      duration: 5000,
      dismissOnPageChange: true
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


          this.ChildObj.fname = this.SignupForm.value.fname;
          this.ChildObj.lname = this.parentObj.fname;
          this.ChildObj.email = this.SignupForm.value.email;
          this.ChildObj.password = this.SignupForm.value.password;
          this.ChildObj.telephone = this.SignupForm.value.telephone;
          this.ChildObj.address.city = this.SignupForm.value.city;
          this.ChildObj.address.street=this.SignupForm.value.street;
          this.ChildObj.address.country=this.SignupForm.value.country;
          this.ChildObj.parent_Id=this.parentObj.id;
          this.ChildObj.imageUrl = snapshot.downloadURL;
          console.log(this.ChildObj);
        });

        this.trackApi.addChild(this.ChildObj).subscribe(data => {
          if (data) {
            
            loader.dismiss();
            
            this.SignupForm.reset();
          }
          else {
            this.msg = 'Somting Went Wrong.. Try Again';
            loader.dismiss();
          }
        })



      }
      else 
      {
          this.ChildObj.parent_Id=this.parentObj.id;  
          this.ChildObj.fname = this.SignupForm.value.fname;
          this.ChildObj.lname = this.parentObj.fname;
          this.ChildObj.email = this.SignupForm.value.email;
          this.ChildObj.password = this.SignupForm.value.password;
          this.ChildObj.telephone = this.SignupForm.value.telephone;
          this.ChildObj.address.city = this.SignupForm.value.city;
          this.ChildObj.address.street=this.SignupForm.value.street;
          this.ChildObj.address.country=this.SignupForm.value.country;
        this.ChildObj.imageUrl = null;
        console.log(this.ChildObj);
        this.trackApi.addChild(this.ChildObj).subscribe(data => {
          if (data) {
            
            loader.dismiss();
            this.parentObj.childs.push(this.ChildObj);
            this.storage.set('parent',this.parentObj);
            this.SignupForm.reset();
          }
          else {
            this.msg = 'Somting Went Wrong.. Try Again';
            loader.dismiss();
          }
        })

      }

    })
  }
  ////////////////////////////////////////////////////////////////
}
