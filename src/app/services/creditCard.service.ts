import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { urlCreditCard } from '../../environments/environment';

const headers = new HttpHeaders().set('Content-Type','application/json');

@Injectable()
export class CreditCardService {

    constructor(
        private _http: HttpClient
    ) {
    }

    testService() {
        return "Probando el servicio de tarjetas de credito"
    }

    saveCreditCard(codAccount: Number, limit: Number): Observable<any>{
        let body = '{ "limitAccount": '+limit+', "codAccount": '+codAccount+' }';
        return this._http.post(urlCreditCard+'/create', body, {headers: headers});
    }

    getCreditCardsByIdentificationAndType(identification: string, type: number): Observable<any>{
        return this._http.get(urlCreditCard+'/listCreditCardClient?identification='+identification+"&type="+type,{headers: headers});
    }

    getCreditCardsByIdentification(identification: string): Observable<any>{
        return this._http.get(urlCreditCard+'/listCreditCard/'+identification,{headers: headers});
    }

    updateStateCreditCard(number: string): Observable<any>{
        let body = '{"number":"'+number+'" ,"state":"INA"}';
        return this._http.put(urlCreditCard+'/updateStatus', body, {headers: headers});
    }
}