
import { TrackApi } from './track-api.service';

export class EmailValidator {

    constructor(private trackApi:TrackApi){
        
    }
    checkUsername(email: string): any {
        
        return this.trackApi.validateEmail(email).subscribe(data=>{
            if(data){
                return true;
            }
            else{
             return false;
            }
        })

    }

}