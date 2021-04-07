import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { urlLoginCore } from '../../environments/environment';

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
    return this.http.post(urlLoginCore, body);
  }
}
