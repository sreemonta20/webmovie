import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { conversions } from '../utilities/conversions';

@Injectable()

export class ApiService {
  public conversions: any;
  baseURL: string = 'http://localhost:3296/api/';
  constructor(private http: HttpClient) {
    this.conversions = new conversions();
  }

  // Post with auth check
  postWithAuthCheck(apiRout: string, model: any): Observable<any> {
    const apiRoutfinal1 = this.baseURL + apiRout;
    const headers = { 'content-type': 'application/json' };

    const body = JSON.stringify(model);
    return this.http.post(apiRoutfinal1, body, { 'headers': headers });
  }

  // GetByID
  getbyid(id: string, getByIdUrl: string): Observable<any> {
    const getByIdUrlFinal = this.baseURL + getByIdUrl + '?id=' + id;
    const headers = { 'content-type': 'application/json' };

    return this.http.get(getByIdUrlFinal, { 'headers': headers });
  }

  // Get All
  getall(getUrl: string): Observable<any[]> {
    const getUrlfinal = this.baseURL + getUrl;
    const headers = new HttpHeaders({
      'content-type': 'application/json',
      Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('token'))
    });
    return this.http.get<any[]>(getUrlfinal, { 'headers': headers });
}

  // Get with multiple models
  getWithMultipleModels(apiRout: string, model: any): Observable<any[]> {
    const qString = JSON.stringify(model);
    const apiRoutfinal = this.baseURL + apiRout + '?param=' + qString;
    const headers = new HttpHeaders({
      'content-type': 'application/json',
      Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('token'))
    });
    return this.http.get<any[]>(apiRoutfinal, { 'headers': headers });
  }

  getWithMultipleModelsExtn(apiRout: string, model: any): Observable<any[]> {
    const qString = this.conversions.JsonStringifyExtn(model);
    const apiRoutfinal = this.baseURL + apiRout + '?param=' + qString;
    const headers = new HttpHeaders({
      'content-type': 'application/json',
      Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('token'))
    });
    return this.http.get<any[]>(apiRoutfinal, { 'headers': headers });
  }

  // Post
  save(model: any, saveUrl: string): Observable<any> {
    const saveUrlFinal = this.baseURL + saveUrl;
    const body = JSON.stringify(model);
    const headers = { 'content-type': 'application/json' };

    return this.http.post(saveUrlFinal, body, { 'headers': headers });
  }

  // PostFormData
  saveForm(model: any, saveUrl: string): Observable<any> {
    const saveUrlFinal = this.baseURL + saveUrl;
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + JSON.parse(localStorage.getItem('token')));

    return this.http.post(saveUrlFinal, model, { 'headers': headers });
  }

  // Post with multiple models
  postWithMultipleModels(apiRout: string, model: any): Observable<any> {
    const apiRoutfinal1 = this.baseURL + apiRout;
    // const headers = { 'content-type': 'application/json' };
    const headers = new HttpHeaders({
      'content-type': 'application/json',
      Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('token'))
    });
    const body = JSON.stringify(model);
    return this.http.post(apiRoutfinal1, body, { headers });
  }

  postWithMultipleModelsExtn(apiRout: string, model: any): Observable<any> {
    const apiRoutfinal1 = this.baseURL + apiRout;
    const headers = new HttpHeaders({
      'content-type': 'application/json',
      Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('token'))
    });

    const body = this.conversions.JsonStringifyExtn(model);

    return this.http.post(apiRoutfinal1, body, { headers });
  }



  // Delete
  delete(id: string, deleteByIdUrl: string): Observable<any> {
    const deleteByIdUrlFinal = this.baseURL + deleteByIdUrl + '?id=' + id;
    const headers = new HttpHeaders({
      'content-type': 'application/json',
      Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('token'))
    });

    return this.http.delete(deleteByIdUrlFinal, { 'headers': headers });
  }

  // Delete With Multiple Models
  deleteWithMultipleModel(apiRout: string, model: any): Observable<any[]> {
    const qString = JSON.stringify(model);
    const apiRoutFinal = this.baseURL + apiRout + '?param=' + qString;
    const headers = new HttpHeaders({
      'content-type': 'application/json',
      Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('token'))
    });

    return this.http.delete<any[]>(apiRoutFinal, { 'headers': headers });
  }

  deleteWithMultipleModelExtn(apiRout: string, model: any): Observable<any[]> {
    const qString = this.conversions.JsonStringifyExtn(model);
    const apiRoutFinal = this.baseURL + apiRout + '?param=' + qString;
    const headers = new HttpHeaders({
      'content-type': 'application/json',
      Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('token'))
    });

    return this.http.delete<any[]>(apiRoutFinal, { 'headers': headers });
  }

  public loadScripts() {
    const libScripts = [
        './assets/scripts/main.js'
    ];

    let tags = document.getElementsByTagName('theme-script')[0];
    if (tags.childNodes.length > 0) {
        for (let i = 0; i < tags.childNodes.length; i++) {
            tags.removeChild(tags.childNodes[i]);
        }
    }

    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < libScripts.length; i++) {
        const node = document.createElement('script');
        node.src = libScripts[i];
        node.type = 'text/javascript';
        node.async = false;
        node.charset = 'utf-8';
        document.getElementsByTagName('theme-script')[0].appendChild(node);
    }
  }

//   JsonStringifyTest(models: any): string {
//     let smodel = '';
//     if (models.length !== undefined) {
//         if (models.length > 1) {
//             for (let i = 0; i < models.length; i++) {
//                 if (i === 0) {
//                     smodel += '[' + JSON.stringify(models[i]) + ',';
//                 }
//                 else if (i === (models.length - 1)) {
//                     smodel += JSON.stringify(models[i]) + ']';
//                 }
//                 else {
//                     smodel += JSON.stringify(models[i]) + ',';
//                 }
//             }
//         }
//         else {
//             smodel = '[' + JSON.stringify(models[0]) + ']';
//         }
//     }
//     else {

//         smodel = '[' + JSON.stringify(models) + ']';
//     }
//     return smodel;
// }


}
