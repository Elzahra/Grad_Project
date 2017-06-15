import { Component, OnInit } from '@angular/core';
import { NavController, ModalController, LoadingController, ToastController } from 'ionic-angular';
import { ModalAutocompleteItems } from '../modal-autocomplete-items/modal-autocomplete-items';
import { TrackApi, ILocation } from '../shared/track-api.service';
import { Storage } from '@ionic/Storage';

declare var google: any;

@Component({
    selector: 'page-page-gmap-autocomplete',
    templateUrl: 'page-gmap-autocomplete.html'
})
export class PageGmapAutocomplete implements OnInit {

    parentId: number;
    locationObj: ILocation = {
        name: '',
        fullAddress: '',
        lat: 0,
        lng: 0,
        parent_key: 0
    }
    address: any = {
        place: '',
        set: false,
    };
    placesService: any;
    map: any;
    markers = [];
    placedetails: any;

    constructor(public navCtrl: NavController,
        public modalCtrl: ModalController,
        private loadingCtrl: LoadingController,
        private storage: Storage,
        private trackApi: TrackApi,
        private toastCtrl: ToastController
    ) {

        storage.get('parent').then((val) => {
            this.parentId = val.id;
            console.log("Parent ID: ", this.parentId);
        });
    }

    ngOnInit() {
        this.initMap();
        this.initPlacedetails();
    }

    showModal() {
        // reset 

        this.reset();
        // show modal|
        let modal = this.modalCtrl.create(ModalAutocompleteItems);
        modal.onDidDismiss(data => {
            console.log('page > modal dismissed > data > ', data);
            if (data) {
                this.address.place = data.description;
                // get details
                this.getPlaceDetail(data.place_id);
            }
        })
        modal.present();
    }

    private reset() {
        this.initPlacedetails();
        this.address.place = '';
        this.address.set = false;
    }

    private getPlaceDetail(place_id: string): void {

        let loader = this.loadingCtrl.create({
            content: 'Loading...',
            duration: 10000,
            dismissOnPageChange: true
        });
        var self = this;
        var request = {
            placeId: place_id
        };
        this.placesService = new google.maps.places.PlacesService(this.map);
        loader.present().then(() => {
            this.placesService.getDetails(request, callback);
            function callback(place, status) {
                if (status == google.maps.places.PlacesServiceStatus.OK) {
                    console.log('page > getPlaceDetail > place > ', place);
                    // set full address
                    self.placedetails.address = place.formatted_address;
                    self.placedetails.lat = place.geometry.location.lat();
                    console.log('Type of lat: ', typeof (self.placedetails.lat))
                    self.placedetails.lng = place.geometry.location.lng();
                    for (var i = 0; i < place.address_components.length; i++) {
                        let addressType = place.address_components[i].types[0];
                        let values = {
                            short_name: place.address_components[i]['short_name'],
                            long_name: place.address_components[i]['long_name']
                        }
                        if (self.placedetails.components[addressType]) {
                            self.placedetails.components[addressType].set = true;
                            self.placedetails.components[addressType].short = place.address_components[i]['short_name'];
                            self.placedetails.components[addressType].long = place.address_components[i]['long_name'];
                        }
                    }
                    // set place in map
                    self.map.setCenter(place.geometry.location);
                    self.createMapMarker(place);
                    // populate
                    self.address.set = true;
                    loader.dismiss();
                    console.log('page > getPlaceDetail > details > ', self.placedetails);
                } else {
                    console.log('page > getPlaceDetail > status > ', status);
                }
            }

        })
    }

    private initMap() {
        var point = { lat: -34.603684, lng: -58.381559 };
        let divMap = (<HTMLInputElement>document.getElementById('map'));
        this.map = new google.maps.Map(divMap, {
            center: point,
            zoom: 15,
            disableDefaultUI: true,
            draggable: false,
            zoomControl: true
        });
    }

    private createMapMarker(place: any): void {
        var placeLoc = place.geometry.location;
        var marker = new google.maps.Marker({
            map: this.map,
            position: placeLoc
        });
        this.markers.push(marker);
    }

    private initPlacedetails() {
        this.placedetails = {
            address: '',
            lat: '',
            lng: '',
            components: {
                route: { set: false, short: '', long: '' },                           // calle 
                street_number: { set: false, short: '', long: '' },                   // numero
                sublocality_level_1: { set: false, short: '', long: '' },             // barrio
                locality: { set: false, short: '', long: '' },                        // localidad, ciudad
                administrative_area_level_2: { set: false, short: '', long: '' },     // zona/comuna/partido 
                administrative_area_level_1: { set: false, short: '', long: '' },     // estado/provincia 
                country: { set: false, short: '', long: '' },                         // pais
                postal_code: { set: false, short: '', long: '' },                     // codigo postal
                postal_code_suffix: { set: false, short: '', long: '' },              // codigo postal - sufijo
            }
        };
    }


    addLocation() {
        this.locationObj.name = this.address.place;
        this.locationObj.fullAddress = this.placedetails.address;
        this.locationObj.lng = this.placedetails.lng;
        this.locationObj.lat = this.placedetails.lat;
        this.locationObj.parent_key = this.parentId;

        console.log("locationObj", this.locationObj);
        let loader = this.loadingCtrl.create({
            content: 'Adding Location...',
            duration: 5000,
            dismissOnPageChange: true
        });
        //

        loader.present().then(() => {
            this.trackApi.addLocation(this.locationObj).subscribe(data => {
                if (data) {
                    this.reset();
                    loader.dismiss();

                    let toast = this.toastCtrl.create({
                        message: 'Location was added successfully',
                        duration: 3000,
                        position: 'middle'
                    });
                    toast.onDidDismiss(() => {
                        console.log('Dismissed toast');
                    });

                    toast.present();
                }
                else {
                    console.log("Error");
                }
            })
        })




    }

}
