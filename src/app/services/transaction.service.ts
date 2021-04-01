import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Transaction } from '../models/transaction';
import { urlTransaction } from '../../environments/environment';

@Injectable()
export class TransactionService {

    constructor(
        private http: HttpClient
    ) {
    }

    saveTransaction(transaction: Transaction): Observable<any> {
        const params = JSON.stringify(transaction);
        const headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this.http.post(urlTransaction + '/create', params, { headers });
    }

    saveTransactionTC(transaction: Transaction): Observable<any> {
        const params = JSON.stringify(transaction);
        const headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this.http.post(urlTransaction + '/cardPayment', params, { headers });
    }

    getTransactions(identification: string, limit: number): Observable<any> {
        const headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this.http.get(urlTransaction + '/listXLastTransactions?account=' + identification + '&limit=' + limit, { headers });
    }

    getTransactionsByType(identification: string, limit: number, type: string): Observable<any> {
        const headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this.http.get(urlTransaction + '/listXLastTransactionsByType?account=' +
        identification + '&limit=' + limit + '&type=' + type, { headers });
    }
}
