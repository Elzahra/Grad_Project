import { Injectable } from '@angular/core';
import { Http,Response } from '@angular/http';
import 'rxjs';
import { Observable } from "rxjs/Observable";

@Injectable()
export class TrackApi{
    private baseUrl='http://localhost:28529/api';
    constructor(private http:Http){

    }

    getParents():Observable<any>{
        return this.http.get(`${this.baseUrl}/parent`)
            .map((res:Response)=>{
                return res.json();
            })

    }

}