import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

import { Constants } from '../../constants/constants';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  localUserData: any;

  constructor(
    private http: HttpClient
  ) { }

   get permissions() {
     return Constants.PERMISSIONS;
   }

  getUserData = () => this.localUserData;
  setUserData = (userData: any) => this.localUserData = userData;

}