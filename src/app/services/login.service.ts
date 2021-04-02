import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private  http: HttpClient
  ) { }

  login(username: string, pwd: string): Observable<any> {
    const body = {
      username,
      pwd
    };
    return this.http.post('http://34.193.109.78:8084/api/corebancario/seguridad/login', body);
  }
}
