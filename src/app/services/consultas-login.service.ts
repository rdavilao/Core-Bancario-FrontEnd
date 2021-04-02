import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConsultasLoginService {

  constructor(
    private http: HttpClient
  ) { }

  login(): Observable<any> {
    const body = {
      password: 'espe123.',
      username: 'haaltamirano'
    };
    return this.http.post('http://52.250.12.217:8086/api/bbConsultas/login', body);
  }
}
