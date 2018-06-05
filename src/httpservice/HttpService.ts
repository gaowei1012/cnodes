import { Http, Headers, RequestOptions } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import 'rxjs/Rx';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/observable/throw';


@Injectable()
export class HttpService {
 
    constructor(public http: Http) {}


    headers = new Headers({'Content-Type': 'keep-alive'});
    options = new RequestOptions({headers: this.headers});

    /**
     *get 请求
     *
     * @param {string} url
     * @returns {Observable<any>}
     * @memberof HttpService
     */
    get(url: string):Observable<any> {
        return this.http
                    .get(url, {
                        headers: new Headers({
                            "Accept": "application/json",
                            "Content-Type": "application/x-www"
                        })
                    })
                    .map(res => res.json())
    }

    /**
     *post请求
     *
     * @param {string} url
     * @param {*} body
     * @returns {Observable<any>}
     * @memberof HttpService
     */
    post(url: string, body: any): Observable<any> {
        return this.http
                    .post(url, body, {
                        headers: new Headers({
                            "Accept": "appliction/json",
                            "Content-Type": "application/x-www"
                        })
                    })
                    .map(res => res.json())
    }

}
