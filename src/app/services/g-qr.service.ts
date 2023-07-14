import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { promotion } from '../interfaces/promotion.interfaces';


@Injectable({
  providedIn: 'root'
})
export class GQrService {

  baseUrl = environment.baseUrl

  constructor(private http: HttpClient,) { }

  postPromotion(body:promotion):Observable<any>{
    return this.http.post(`${this.baseUrl}/qr/generate-qr`, body)
  }

  GetById(id:string):Observable<any>{
    return this.http.get(`${this.baseUrl}/qr/${id}`)
  }

  PostById(id:string):Observable<any>{
    return this.http.post(`${this.baseUrl}/qr${id}/scan`, {})
  }


}
