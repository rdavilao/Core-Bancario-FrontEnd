import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { bodyConsultas, urlbbConsultas } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConsultasLoginService {

  constructor(
    private http: HttpClient
  ) { }

  login(): Observable<any> {
    return this.http.post(urlbbConsultas + '8086/api/bbConsultas/login', bodyConsultas);
  }
}
