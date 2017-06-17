import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import 'rxjs';
import { Observable } from "rxjs/Observable";

export enum Role {
    Admin = 1,
    Parent,
    Child
}

export interface ILocation {
    id?: number;
    name: string;
    fullAddress: string;
    lng: number;
    lat: number;
    parent_key: number;
}

export interface IParent {

    id?: number;
    fname: string;
    lname: string;
    email: string;
    password: string;
    viewFlag: boolean;
    imageUrl: string;
    telephone: string;
    userRole: Role.Parent;
    address: {
        street: string;
        city: string;
        country: string;
    }

}
export interface IChild {

    id?: number;
    fname: string;
    lname: string;
    email: string;
    password: string;
    viewFlag: boolean;
    imageUrl: string;
    telephone: string;
    userRole: Role;
    parent_Id: number;
    address: {
        street: string;
        city: string;
        country: string;
    }

}



@Injectable()
export class TrackApi {
    private baseUrl = 'http://trackapi.gear.host/api';
    //head = new Headers({ 'Content-Type': 'application/json' });
    //http://localhost:28529/api/parent/GetByEmail
    constructor(private http: Http) {

    }


    getParents(): Observable<IParent[]> {
        return this.http.get(`${this.baseUrl}/parent`)
            .map((res: Response) => {
                return res.json();
            })

    }
    ///////////////////////
    getParentsById(key): Observable<IParent[]> {
        return this.http.get(`${this.baseUrl}/parent/{key}`)
            .map((res: Response) => {
                return res.json();
            })
    }
    ////////////////////////
    getChildren(): Observable<IChild[]> {
        return this.http.get(`${this.baseUrl}/Child`)
            .map((res: Response) => {
                return res.json();
            })
    }
    /////////////////////////////
    addParent(body: IParent): Observable<IParent> {
        let bodyString = JSON.stringify(body); // Stringify payload
        let headers = new Headers({ 'Content-Type': 'application/json; charset=utf-8' });
        return this.http.post(`${this.baseUrl}/parent`, bodyString, { headers: headers })
            .map((res: Response) => {
                console.log("Response From Api: " + res.json());
                return res.json();
            })
    }
    ////////////////////////
    UpdateParent(parent: IParent): Observable<IParent> {
        console.log("inside api service", parent);
        console.log("   iiiiiid   ", parent.id);
        let bodyString = JSON.stringify(parent); // Stringify payload
        console.log(" bodyString ", bodyString);
        let headers = new Headers({ 'Content-Type': 'application/json; charset=utf-8' });


        return this.http.put(`${this.baseUrl}/parent/${parent.id}`, bodyString, { headers: headers }).map((res: Response) => {
                console.log("Response From put Api: " + res.json());
                return res.json();
            })
    }
    ////////////////////////
    addChild(body: IChild): Observable<IChild> {
        let bodyString = JSON.stringify(body); // Stringify payload
        let headers = new Headers({ 'Content-Type': 'application/json; charset=utf-8' });
        return this.http.post(`${this.baseUrl}/Child`, bodyString, { headers: headers })
            .map((res: Response) => {
                console.log("Response From Api: " + res.json());
                return res.json();
            })
    }

    addLocation(body: ILocation): Observable<ILocation> {
        let bodyString = JSON.stringify(body); // Stringify payload
        let headers = new Headers({ 'Content-Type': 'application/json; charset=utf-8' });
        return this.http.post(`${this.baseUrl}/Locations`, bodyString, { headers: headers })
            .map((res: Response) => {
                console.log("Response From Api: " + res.json());
                return res.json();
            })
    }
    validateEmail(body: string): Observable<IParent> {
        let headers = new Headers({ 'Content-Type': 'application/json; charset=utf-8' });
        return this.http.post(`${this.baseUrl}/Locations`, body, { headers: headers })
            .map((res: Response) => {
                console.log("Response From Api: " + res.json());
                return res.json();
            })
    }
    /////////////////////////////

}