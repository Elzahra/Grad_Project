// <<<<<<< HEAD
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { IonicStorageModule , Storage } from '@ionic/Storage';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { TrackApi } from '../pages/shared/track-api.service'
import { EmailValidator } from '../pages/shared/validator'
import {Camera} from '@ionic-native/camera';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';
import { MyChildPage } from '../pages/my-child/my-child';
import { SetSchedulePage } from '../pages/set-schedule/set-schedule';
import { ChildDetailsPage } from '../pages/child-details/child-details';
import { SchedulesPage } from '../pages/schedules/schedules';
import {  AddSchedulePage} from '../pages/add-schedule/add-schedule';
import { EditSchedulePage } from '../pages/edit-schedule/edit-schedule';
import { RemoveSchedulePage } from '../pages/remove-schedule/remove-schedule';
import {  StatisticsPage} from '../pages/statistics/statistics';
import { AddChildPage } from '../pages/add-child/add-child';
import { AddLocationPage } from '../pages/add-location/add-location';
import { MyLocationsPage } from '../pages/my-locations/my-locations';
import { ChildMapPage } from '../pages/child-map/child-map';
import { EditProfilePage } from '../pages/edit-profile/edit-profile';
import { ParentProfilePage } from '../pages/parent-profile/parent-profile';
import { PageGmapAutocomplete } from '../pages/page-gmap-autocomplete/page-gmap-autocomplete';
import { ModalAutocompleteItems } from '../pages/modal-autocomplete-items/modal-autocomplete-items';
import { AgmCoreModule } from '@agm/core';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    LoginPage,
    SignupPage,
    MyChildPage,
    SetSchedulePage,
    ChildDetailsPage,
    SchedulesPage,
    AddSchedulePage,
    EditSchedulePage,
    RemoveSchedulePage,
    StatisticsPage,
    AddChildPage,
    AddLocationPage,
    MyLocationsPage,
    ChildMapPage,
    PageGmapAutocomplete,
    ModalAutocompleteItems,
    ParentProfilePage,
    EditProfilePage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyD147jg0SjU32sglPT4qfi2VfGcL1EC364'
    })
    
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    LoginPage,
    SignupPage,
    MyChildPage,
    SetSchedulePage,
    ChildDetailsPage,
    SchedulesPage,
    AddSchedulePage,
    EditSchedulePage,
    RemoveSchedulePage,
    StatisticsPage,
    AddChildPage,
    AddLocationPage,
    MyLocationsPage,
    ChildMapPage,
    PageGmapAutocomplete,
    ModalAutocompleteItems,
    ParentProfilePage,
    EditProfilePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    EmailValidator,
    TrackApi,
    Camera,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
