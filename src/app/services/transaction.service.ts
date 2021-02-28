import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Transaction } from '../models/transaction';
import { global } from './global';

@Injectable()
export class TransactionService {
    public url: string;

    constructor(
        private _http: HttpClient
    ) {
        this.url = global.urlTransaction;
    }

    testService() {
        return "Probando el servicio de transacciones"
    }

    saveTransaction(transaction: Transaction): Observable<any>{
        let params = JSON.stringify(transaction);
        let headers = new HttpHeaders().set('Content-Type','application/json');
        return this._http.post(this.url+'/create', params, {headers: headers});
    }
}