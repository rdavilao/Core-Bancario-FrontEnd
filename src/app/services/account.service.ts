import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Account } from '../models/account';
import { urlAccount } from '../../environments/environment';

const headers = new HttpHeaders().set('Content-Type', 'application/json');

@Injectable()
export class AccountService {

    constructor(
        private http: HttpClient
    ) {
    }

    saveAccount(account: Account): Observable<any> {
        const body = '{"clientIdentification":"' + account.CLIENT_IDENTIFICATION + '" ,"type":' + account.TYPE + '}';
        return this.http.post(urlAccount + '/create', body, { headers });
    }

    getAccountsByIdentification(identification: string): Observable<any> {
        return this.http.get(urlAccount + '/listAccount/' + identification, { headers });
    }

    getAccountByNumber(numberAccount: string): Observable<any> {
        return this.http.get(urlAccount + '/findAccountByNumber/' + numberAccount, { headers });
    }

    getLastAccountByIdentification(identification: string): Observable<any> {
        return this.http.get(urlAccount + '/findLastAccount/' + identification, { headers });
    }

    updateStateAccount(numberAccount: string): Observable<any> {
        const body = '{"number":"' + numberAccount + '" ,"state":"INA"}';
        return this.http.put(urlAccount + '/updateStatus', body, { headers });
    }
}
