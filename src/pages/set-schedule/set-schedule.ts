import { Component } from '@angular/core';
import {  NavController, NavParams } from 'ionic-angular';
import {SchedulesPage} from '../schedules/schedules';
/**
 * Generated class for the SetSchedulePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-set-schedule',
  templateUrl: 'set-schedule.html',
})
export class SetSchedulePage {
schedules:Array<string>=[]
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.schedules=["schedule1","schedule2","schedule3","schedule4"]
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SetSchedulePage');
  }
//
Itemschedule(event,item)
{
   this.navCtrl.push(SchedulesPage, {
      item: item
      });
}
}
