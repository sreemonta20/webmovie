import { Inject, Injectable, Component } from '@angular/core';
import { HttpModule, Http, Request, RequestMethod, Response, RequestOptions } from '@angular/http';
import {Headers} from '@angular/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { DOCUMENT } from '@angular/common';
import { conversions } from '../utilities/conversions';
import { ApiConst } from '../utilities/apiconstant';


@Injectable()

export class DataService {
    public smodel: string;
    public domain: string;
    public headers: Headers;
    public conversions: any;
    public apiHost: any;

    constructor(private http: Http, @Inject(DOCUMENT) private document: any) {
        this.conversions = new conversions();
        this.apiHost = new ApiConst();
        this.apiHost = this.apiHost.autohost(this.document.location.hostname);
    }



    // GetByID
    getbyid(id: string, getByIdUrl: string): Observable<any> {
        getByIdUrl = this.apiHost + getByIdUrl + '?id=' + id;

        return this.http.get(getByIdUrl)
            .pipe(map(res => res.json() as any))
            .pipe(catchError(this.handleError));
    }

    // Post
    save(model: any, saveUrl: string): Observable<any> {
        saveUrl = this.apiHost + saveUrl;
        let body = JSON.stringify(model);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers:headers });

        return this.http.post(saveUrl, body, options)
            .pipe(map(res => res.json()))
            .pipe(catchError(this.handleError));
    }

    // PostFormData
    saveForm(model: any, saveUrl: string): Observable<any> {
        saveUrl = this.apiHost + saveUrl;
        return this.http.post(saveUrl, model)
            .pipe(map(res => res.json()))
            .pipe(catchError(this.handleError));
    }

    // Post with multiple models
    postMultipleModel(apiRout: string, model: any): Observable<any> {
      let body = this.conversions.JsonStringify(model);
      apiRout = this.apiHost + apiRout;
      let headers = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers:headers });
      return this.http.post(apiRout, body, options)
          .pipe(map(res => res.json()))
          .pipe(catchError(this.handleError));
  }

  // Post Upload with multiple models
  postUploadModel(apiRout: string, model: any): Observable<any> {
      let body = this.conversions.JsonStringify(model);
      apiRout = this.apiHost + apiRout;
      let headers = new Headers({ 'Content-Type': 'multipart/form-data' });
      let options = new RequestOptions({ headers:headers });
      return this.http.post(apiRout, body, options)
          .pipe(map(res => res.json()))
          .pipe(catchError(this.handleError));
  }

    // Delete
    delete(id: string, deleteByIdUrl: string): Observable<any> {

        deleteByIdUrl = this.apiHost + deleteByIdUrl + '?id=' + id;

        return this.http.delete(deleteByIdUrl)
            .pipe(map(res => res.json()))
            .pipe(catchError(this.handleError));
    }

    // Delete with multiple models
    deleteWithMultipleModel(apiRout: string, model: any): Observable<any[]> {

        let qString = this.conversions.JsonStringify(model);
        apiRout = this.apiHost + apiRout + '?param=' + qString;
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers:headers });
        return this.http.delete(apiRout, options)
            .pipe(map(res => res.json()))
            .pipe(catchError(this.handleError));
    }



    // Error Response
    private handleError(error: Response) {
        return Observable.throw(error.json().error || 'Opps!! Server error');
    }
}
