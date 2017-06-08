import { Component } from '@angular/core';
import { NavController, NavParams, MenuController, LoadingController } from 'ionic-angular';
import { MyChildPage } from '../my-child/my-child';
import { MyApp } from '../../app/app.component';
import { TrackApi } from '../shared/track-api.service';
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
  parents: Array<any> = [];
  selectedParent: any;
  msg: string = "";

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private trackApi: TrackApi,
    private loadingCtrl: LoadingController,
    private formBuilder: FormBuilder
  ) {
        this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required,Validators.pattern('^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$')]],
      password: ['',Validators.required],
    });
    //this.menuCtrl.enable(false, 'myMenu');
    //Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+')
  }

  ionViewDidLoad() {


  }
  //
  GoToMychild() {
    let email = this.loginForm.value.email;
    let pass = this.loginForm.value.pass;
    let loader = this.loadingCtrl.create({
      content: 'Logging In...'
    });

    loader.present().then(() => {
      this.trackApi.getParents().subscribe(data => {
        this.parents = data;
<<<<<<< HEAD
            this.selectedParent = this.parents.find(p => p.email == email && p.password == pass)
                  
=======
        this.selectedParent = this.parents.find(p => p.email == email && p.password == pass)

>>>>>>> 06cc38bbae04aea63bbd727ebe418d3ca50f67dc
        //console.log("From Login: "+this.selectedParent);
        if (this.selectedParent != undefined) {
          this.navCtrl.setRoot(MyChildPage);
          this.navCtrl.push(MyChildPage, this.selectedParent);
          loader.dismiss();
        }
        else {
          this.msg = "Incorrect data";
          loader.dismiss();

        }


      })
    })



  }

}
