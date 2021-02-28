import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Transaction } from '../models/transaction';
import { urlTransaction } from '../../environments/environment';

@Injectable()
export class TransactionService {

    constructor(
        private _http: HttpClient
    ) {
    }

    testService() {
        return "Probando el servicio de transacciones"
    }

    saveTransaction(transaction: Transaction): Observable<any>{
        let params = JSON.stringify(transaction);
        let headers = new HttpHeaders().set('Content-Type','application/json');
        return this._http.post(urlTransaction+'/create', params, {headers: headers});
    }

    getTransactions(identification: string, limit: number): Observable<any>{
        let headers = new HttpHeaders().set('Content-Type','application/json');
        return this._http.get(urlTransaction+'/listXLastTransactions?identification='+identification+"&limit="+limit,{headers: headers});
    }
}