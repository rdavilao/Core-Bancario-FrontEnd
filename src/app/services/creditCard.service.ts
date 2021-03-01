import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { CreditCard } from '../models/creditCard';
import { urlCreditCard } from '../../environments/environment';

@Injectable()
export class CreditCardService {

    constructor(
        private _http: HttpClient
    ) {
    }

    testService() {
        return "Probando el servicio de tarjetas de credito"
    }

    saveTransaction(creditCard: CreditCard): Observable<any>{
        let params = JSON.stringify(creditCard);
        let headers = new HttpHeaders().set('Content-Type','application/json');
        return this._http.post(urlCreditCard+'/create', params, {headers: headers});
    }

    getCreditCardsByIdentificationAndType(identification: string, type: number): Observable<any>{
        let headers = new HttpHeaders().set('Content-Type','application/json');
        return this._http.get(urlCreditCard+'/listCreditCardClient?identification='+identification+"&type="+type,{headers: headers});
    }
}