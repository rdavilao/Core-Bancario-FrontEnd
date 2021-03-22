import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { urlCreditCard } from '../../environments/environment';

const headers = new HttpHeaders().set('Content-Type', 'application/json');

@Injectable()
export class CreditCardService {

    constructor(
        private http: HttpClient
    ) {
    }

    saveCreditCard(codAccount: number, limit: number): Observable<any> {
        const body = '{ "limitAccount": ' + limit + ', "codAccount": ' + codAccount + ' }';
        return this.http.post(urlCreditCard + '/create', body, { headers });
    }

    getCreditCardsByIdentificationAndType(identification: string, type: number): Observable<any> {
        return this.http.get(urlCreditCard + '/listCreditCardClient?identification=' + identification + '&type=' + type, { headers });
    }

    getCreditCardsByIdentification(identification: string): Observable<any> {
        return this.http.get(urlCreditCard + '/listCreditCard/' + identification, { headers });
    }

    updateStateCreditCard(numberUpdate: string): Observable<any> {
        const body = `{"number":"${numberUpdate}" ,"state":"INA"}`;
        return this.http.put(urlCreditCard + '/updateStatus', body, { headers });
    }
}
