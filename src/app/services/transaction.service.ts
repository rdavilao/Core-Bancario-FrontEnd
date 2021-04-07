import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Transaction } from '../models/transaction';
import { urlTransaction, urlbbConsultas } from '../../environments/environment';

const headersConsultas = new HttpHeaders().set('Authorization', localStorage.getItem('tokenConsultas'));
const headersCore = new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('Authorization', localStorage.getItem('token'));

@Injectable()
export class TransactionService {

    constructor(
        private http: HttpClient
    ) {
    }

    saveTransaction(transaction: Transaction): Observable<any> {
        const params = JSON.stringify(transaction);
        console.log(params);
        return this.http.post(urlTransaction + '/create', params, { headers: headersCore });
    }

    saveTransactionTC(transaction: Transaction): Observable<any> {
        const params = JSON.stringify(transaction);
        return this.http.post(urlTransaction + '/cardPayment', params, { headers: headersCore });
    }

    getTransactions(identification: string, limit: number): Observable<any> {
        return this.http.get(urlTransaction + '/listXLastTransactions?account=' + identification +
            '&limit=' + limit, { headers: headersCore });
    }

    getTransactionsByType(identification: string, limit: number, type: string): Observable<any> {
        return this.http.get(urlTransaction + '/listXLastTransactionsByType?account=' +
            identification + '&limit=' + limit + '&type=' + type, { headers: headersCore });
    }

    getMontPlanillaElectrica(medidor: string): Observable<any> {
        return this.http.get(urlbbConsultas + '8085/api/bbConsultas/electrica/' + medidor, { headers: headersConsultas });
    }

    payMonthPlanillaElectrica(medidor: string): Observable<any> {
        return this.http.put(urlbbConsultas + '8085/api/bbConsultas/electrica/updateMonto?medidor=' +
        medidor, { header: headersConsultas });
    }

    getMontPlanillaAguaPotable(medidor: string): Observable<any> {
        return this.http.get(urlbbConsultas + '8084/api/bbConsultas/aguaPotable/' + medidor, { headers: headersConsultas });
    }

    payMonthPlanillaAguaPotable(medidor: string): Observable<any> {
        return this.http.put(urlbbConsultas + '8084/api/bbConsultas/aguaPotable/updateMonto?medidor=' +
            medidor, { header: headersConsultas });
    }
}
