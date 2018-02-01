import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs/Rx';
import "rxjs/Rx";

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class ConnectService {

  private url = 'https://jsonplaceholder.typicode.com/posts/';

  constructor (
    private http: Http) {}




  getInfo() {
    return this.http
      .get(this.url)
      .map((res: Response) => {
        return res.json();
      })
      .catch(this.handleError);
  }

  private handleError(error: Response) {
    return Observable.throw(error.statusText);
  }

}
