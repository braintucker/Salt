import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs/Rx';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class ConnectService {
  constructor (
    private http: HttpClient) {}

  //Dark sky secret key: 6f092cadbb74b4b86616350dc2110afd

  // private darkskyUrl = 'https://api.darksky.net/forecast/6f092cadbb74b4b86616350dc2110afd/30.4583,91.1403'

  private darkskyUrl = 'https://jsonplaceholder.typicode.com/posts/1';

  getInfo() {
    return this.http.get(this.darkskyUrl);
  }



}
