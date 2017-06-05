import { Component } from '@angular/core';
import {  NavController, NavParams } from 'ionic-angular';
import {AddSchedulePage} from '../add-schedule/add-schedule';
import {EditSchedulePage} from '../edit-schedule/edit-schedule';
import {RemoveSchedulePage} from '../remove-schedule/remove-schedule';
/**
 * Generated class for the SchedulesPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-schedules',
  templateUrl: 'schedules.html',
})
export class SchedulesPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SchedulesPage');
  }
//
AddSchedule()
{
  this.navCtrl.push(AddSchedulePage);
}
//
EditSchedule()
{
  this.navCtrl.push(EditSchedulePage);
}
//
RemoveSchedule()
{
  this.navCtrl.push(RemoveSchedulePage);
}
}
