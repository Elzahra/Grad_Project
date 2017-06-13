<ion-menu id="myMenu" [content]="content">
   <ion-toolbar>
      <ion-title>Child Tracking</ion-title>
    </ion-toolbar>

  <ion-content>
    <ion-list>
      <ion-list-header>Navigate</ion-list-header>
      <button menuClose ion-item (click)="goHome()" >Home</button>
      <button menuClose ion-item (click)="goToParentPage()" >Profile</button>
      <button menuClose ion-item (click)="goToAddChild()" >Add Child</button>
      <button menuClose ion-item (click)="goToLocation()" >Add Location</button>    
    </ion-list>
  </ion-content>

</ion-menu>

<!-- Disable swipe-to-go-back because it's poor UX to combine STGB with side menus -->
<ion-nav [root]="rootPage" #content swipeBackEnabled="false"></ion-nav>