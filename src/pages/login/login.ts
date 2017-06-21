import { Component } from '@angular/core';
import { NavController, NavParams, MenuController, LoadingController, ToastController } from 'ionic-angular';
import { MyChildPage } from '../my-child/my-child';
//import { ChildProfilePage } from '../child-profile/child-profile';
import { Storage } from '@ionic/Storage';
//import { Storage } from '@ionic/storage';

import { TrackApi, IParent, ILogin } from '../shared/track-api.service';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

/**
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  login: ILogin = {
    email: "",
    password: ""
  }
  loginForm: FormGroup;
  parents: Array<IParent> = [];
  //children: Array<IChild> = [];
  selectedParent: IParent;
  // selectedChild: IChild;
  msg: string = "";

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private trackApi: TrackApi,
    private loadingCtrl: LoadingController,
    private formBuilder: FormBuilder,
    private storage: Storage,
    private menuCtrl: MenuController,
    private toastCtrl: ToastController
  ) {
    this.menuCtrl.swipeEnable(false);
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$')]],
      password: ['', Validators.required],
    });
    //this.menuCtrl.enable(false, 'myMenu');
    //Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+')
  }

  ionViewDidLoad() {


  }
  //
  GoToMychild() {


    this.login.email = this.loginForm.value.email
    this.login.password = this.loginForm.value.password
    console.log(this.login);
    let loader = this.loadingCtrl.create({
      content: 'Logging In...',

    });

    loader.present().then(() => {
      this.trackApi.loginParent(this.login).subscribe((data) => {

        this.selectedParent = data;

        if (this.selectedParent) {
          //this.store.set('userId', this.selectedParent.id);
          this.storage.clear();
          this.storage.set('parent', this.selectedParent);
          loader.dismiss();
          this.navCtrl.setRoot(MyChildPage);
          this.navCtrl.popToRoot();
        }

      }, (err => {
        switch (err.status) {
          // case 0:
          //   this.msg = "Check Your Internet.";
          //   loader.dismiss();
          //   break;
          case 408:
            this.msg = "Connection TimeOut.";
            loader.dismiss();
            break;
          case 400:
            this.msg = "Bad Request.";
            loader.dismiss();
            break;
          case 404:
            this.msg = "Wrong Email Or Password.";
            loader.dismiss();
            break;
          case 403:
            this.msg = "FORBIDDEN.";
            loader.dismiss();
            break;
          default:
            this.msg = "Somting Went Wrong.";
            loader.dismiss();
            break;
        }








      }))

    })

  }

}
