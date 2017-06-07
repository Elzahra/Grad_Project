import { Component } from '@angular/core';
import { NavController, NavParams, MenuController, LoadingController } from 'ionic-angular';
import { MyChildPage } from '../my-child/my-child';
import { MyApp } from '../../app/app.component';
import { TrackApi } from '../shared/track-api.service';

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

  parents: Array<any> = [];
  selectedParent: any;
  msg: string = "";

  constructor(public navCtrl: NavController, public navParams: NavParams, private trackApi: TrackApi, private loadingCtrl: LoadingController) {
    //this.menuCtrl.enable(false, 'myMenu');
  }

  ionViewDidLoad() {

    
  }
  //
  GoToMychild(email, pass) {
    
            let loader = this.loadingCtrl.create({
      content: 'Logging In...'
    });

    loader.present().then(() => {
      this.trackApi.getParents().subscribe(data => {
        this.parents = data;
            this.selectedParent = this.parents.find(p => p.email == email && p.password == pass)
        
        //console.log("From Login: "+this.selectedParent);
        if (this.selectedParent != undefined) {
            this.navCtrl.setRoot(MyChildPage);
            this.navCtrl.push(MyChildPage,this.selectedParent);
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
