import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Account } from '../models/account';
import { urlAccount } from '../../environments/environment';

@Injectable()
export class AccountService {

    constructor(
        private _http: HttpClient
    ) {
    }

    testService() {
        return "Probando el servicio de tarjetas de credito"
    }

    saveAccount(account: Account): Observable<any>{
        let body = '{"clientIdentification":"'+account.CLIENT_IDENTIFICATION+'" ,"type":'+account.TYPE+'}';
        console.log(body);
        let headers = new HttpHeaders().set('Content-Type','application/json');
        return this._http.post(urlAccount+'/create', body, {headers: headers});
    }

    getAccountByNumber(number: string): Observable<any>{
        let headers = new HttpHeaders().set('Content-Type','application/json');
        return this._http.get(urlAccount+'/findAccountByNumber/'+number,{headers: headers});
    }
}