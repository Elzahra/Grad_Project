import { Injectable } from '@angular/core';
import { Http,Response,RequestOptions,Headers } from '@angular/http';
import 'rxjs';
import { Observable } from "rxjs/Observable";

    Parent,
    Child
}
export interface IParent{
    
    id?:number;
    fname: string;
    lname: string;
    email: string;
    password: string;
    viewFlag: boolean;
    imageUrl: string;
    telephone: string;
    userRole: Role.Parent
    address: {
      street: string;
      city: string;
      country: string;
    },
    
  }



@Injectable()
export class TrackApi{
    private baseUrl='http://localhost:28529/api';
    //head = new Headers({ 'Content-Type': 'application/json' });
            
    constructor(private http:Http){
        
    }

    getParents():Observable<IParent[]>{
        return this.http.get(`${this.baseUrl}/parent`)
            .map((res:Response)=>{
                return res.json();
            })

    }

    addParent(body:IParent):Observable<IParent>{
            let bodyString = JSON.stringify(body); // Stringify payload
            let headers= new Headers({'Content-Type':'application/json; charset=utf-8'});
            
            
           // let options = new RequestOptions({headers});
            
            
            
        return this.http.post(`${this.baseUrl}/parent`,bodyString,{headers:headers})
            .map((res:Response)=>{
                console.log("Response From Api: "+res.json());
                return res.json();
            })
    }

}