import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Account } from '../models/account';
import { urlAccount } from '../../environments/environment';

const headers = new HttpHeaders().set('Content-Type','application/json');

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
        return this._http.post(urlAccount+'/create', body, {headers: headers});
    }

    getAccountsByIdentification(identification: string): Observable<any>{
        return this._http.get(urlAccount+'/listAccount/'+identification,{headers: headers});
    }

    getAccountByNumber(number: string): Observable<any>{
        return this._http.get(urlAccount+'/findAccountByNumber/'+number,{headers: headers});
    }

    updateStateAccount(number: string): Observable<any>{
        let body = '{"number":"'+number+'" ,"state":"INA"}';
        return this._http.put(urlAccount+'/updateStatus', body, {headers: headers});
    }
}