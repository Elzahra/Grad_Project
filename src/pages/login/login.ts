import { Component } from '@angular/core';
import { NavController, NavParams, MenuController, LoadingController, ToastController } from 'ionic-angular';
import { MyChildPage } from '../my-child/my-child';
//import { ChildProfilePage } from '../child-profile/child-profile';
import { Storage } from '@ionic/Storage';
//import { Storage } from '@ionic/storage';

import { TrackApi, IParent } from '../shared/track-api.service';
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
    let email = this.loginForm.value.email;
    let pass = this.loginForm.value.password;
    console.log(email + " - " + pass)
    let loader = this.loadingCtrl.create({
      content: 'Logging In...',
      duration: 5000,
      dismissOnPageChange: true
    });

    loader.present().then(() => {
      this.trackApi.getParents().subscribe(data => {
        this.parents = data;
        this.selectedParent = this.parents.find(p => p.email.toLowerCase() == email.toLowerCase() && p.password == pass)
        if (this.selectedParent != undefined) {
          //this.store.set('userId', this.selectedParent.id);
          this.storage.clear();
          this.storage.set('parent',this.selectedParent);
          this.navCtrl.setRoot(MyChildPage);
          this.navCtrl.popToRoot();
        }
        else {
          this.msg = "Wrong Email Or Password";
          loader.dismiss();
        }
      })
    })



    // loader.onDidDismiss(()=>{
    //    this.msg = "Connection TimeOut Try Again Later.";
    // })


  }

}
