import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Transaction } from '../models/transaction';
import { urlTransaction } from '../../environments/environment';

const headersConsultas = new HttpHeaders().set('Authorization', localStorage.getItem('tokenConsultas'));
const headers = new HttpHeaders().set('Authorization', localStorage.getItem('token'));

@Injectable()
export class TransactionService {

    constructor(
        private http: HttpClient
    ) {
    }

    saveTransaction(transaction: Transaction): Observable<any> {
        const params = JSON.stringify(transaction);
        return this.http.post(urlTransaction + '/create', params, { headers });
    }

    saveTransactionTC(transaction: Transaction): Observable<any> {
        const params = JSON.stringify(transaction);
        return this.http.post(urlTransaction + '/cardPayment', params, { headers });
    }

    getTransactions(identification: string, limit: number): Observable<any> {
        return this.http.get(urlTransaction + '/listXLastTransactions?account=' + identification + '&limit=' + limit, { headers });
    }

    getTransactionsByType(identification: string, limit: number, type: string): Observable<any> {
        return this.http.get(urlTransaction + '/listXLastTransactionsByType?account=' +
            identification + '&limit=' + limit + '&type=' + type, { headers });
    }

    getMontPlanillaElectrica(medidor: string): Observable<any> {
        return this.http.get('http://52.250.12.217:8085/api/bbConsultas/electrica/' + medidor, { headers: headersConsultas });
    }

    payMonthPlanillaElectrica(medidor: string): Observable<any> {
        return this.http.put('http://52.250.12.217:8085/api/bbConsultas/electrica/updateMonto?medidor=' +
        medidor, { header: headersConsultas });
    }

    getMontPlanillaAguaPotable(medidor: string): Observable<any> {
        return this.http.get('http://52.250.12.217:8084/api/bbConsultas/aguaPotable/' + medidor, { headers: headersConsultas });
    }

    payMonthPlanillaAguaPotable(medidor: string): Observable<any> {
        return this.http.put('http://52.250.12.217:8084/api/bbConsultas/aguaPotable/updateMonto?medidor=' +
        medidor, { header: headersConsultas });
    }
}
