import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import firebase from 'firebase';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { MyChildPage } from '../pages/my-child/my-child';
import { AddChildPage } from '../pages/add-child/add-child';
import { ParentProfilePage } from '../pages/parent-profile/parent-profile';
import { PageGmapAutocomplete } from '../pages/page-gmap-autocomplete/page-gmap-autocomplete';
import { Storage } from '@ionic/Storage';
import { Push } from '@ionic/cloud-angular';
import * as io from 'socket.io-client';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any;
  selectedParent: any;
  children: any;
  socket: any;
  pages: Array<{ title: string, component: any }>;

  constructor(public platform: Platform, public statusBar: StatusBar, private push: Push, public splashScreen: SplashScreen, private storage: Storage) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'List', component: ListPage }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      let parentUser;
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.storage.get('parent').then((val) => {

        console.log("parent val", val);
        if (val != null) {
          this.selectedParent = val;
          this.children = this.selectedParent.childs;
          this.rootPage = MyChildPage;
          this.push.register().then(token => {
            parentUser = {
              id: this.selectedParent.id,
              token: token.token
            }
            //alert(JSON.stringify(token));
            this.socket = io.connect("http://realtimetrack.eu-2.evennode.com/");
            this.socket.on('connect', () => {
              console.log("from parent app", this.selectedParent.id);
              console.log("from parent app>>Obj", this.selectedParent);
              this.socket.emit('NotifyParent', parentUser);
            })
          });
          this.push.rx.notification().subscribe(msg => {


            this.push.register().then(token => {
              parentUser = {
                id: this.selectedParent.id,
                token: token.token
              }
              this.socket = io.connect("http://realtimetrack.eu-2.evennode.com/");
              this.socket.on('connect', () => {
                console.log("from parent app", this.selectedParent.id);
                console.log("from parent app>>Obj", this.selectedParent);
                this.socket.emit('NotifyParent', parentUser);
              })
            });
            
            // alert(msg.);
            
            // this.nav.setRoot(AddLocationPage, msg);
          });
          this.statusBar.styleDefault();
          this.splashScreen.hide();
        }
        else {
          this.rootPage = HomePage;
          this.statusBar.styleDefault();
          this.splashScreen.hide();
        }

      });


      let config = {
        apiKey: "AIzaSyDohpBfcMQaDLWsfeYnULxdfSxVzfLy-SI",
        authDomain: "myapp-891c4.firebaseapp.com",
        databaseURL: "https://myapp-891c4.firebaseio.com",
        projectId: "myapp-891c4",
        storageBucket: "myapp-891c4.appspot.com",
        messagingSenderId: "1034732611687"
      };
      firebase.initializeApp(config);


    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  goToAddChild() {
    this.nav.push(AddChildPage)

  }
  goToLocation() {
    this.nav.push(PageGmapAutocomplete);
  }
  goToParentPage() {
    this.nav.push(ParentProfilePage);
  }
  goHome() {
    this.nav.popToRoot();
  }
  LogOut() {
    this.push.unregister().then(() => {

    })
    this.storage.clear();
    this.nav.setRoot(HomePage);
    this.nav.popToRoot();


  }

}
