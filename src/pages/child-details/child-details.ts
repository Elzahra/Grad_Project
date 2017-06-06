import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { SetSchedulePage } from '../set-schedule/set-schedule';
import { StatisticsPage } from '../statistics/statistics';
import { ChildMapPage } from '../child-map/child-map';

/**
 * Generated class for the ChildDetailsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-child-details',
  templateUrl: 'child-details.html',
})
export class ChildDetailsPage {
  childMonTab: any = ChildMapPage;
  statisticsTab: any = StatisticsPage;
  shecdualTab: any = SetSchedulePage;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChildDetailsPage');
  }
  //
  GoToSchedule()
  { this.navCtrl.push(SetSchedulePage); }
  //
  GoToStatistics()
  { this.navCtrl.push(StatisticsPage); }

  goHome(){
    this.navCtrl.popToRoot();
  }
}

