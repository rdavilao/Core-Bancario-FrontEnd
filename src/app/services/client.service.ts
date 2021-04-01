import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Client } from '../models/client/client';
import { urlClient } from '../../environments/environment';

const headersConsultas = new HttpHeaders().set('Authorization', localStorage.getItem('tokenConsultas'));
const headers = new HttpHeaders().set('Content-Type', 'application/json');
const bbConsultas = 'http://52.250.12.217:';

@Injectable()
export class ClientService {

    constructor(
        private http: HttpClient
    ) {
    }

    saveClient(client: Client): Observable<any> {
        const params = JSON.stringify(client);
        return this.http.post(urlClient + '/create', params, { headers });
    }

    getAccountByNumber(numberAccount: string): Observable<any> {
        return this.http.get(urlClient + '/findAccountByNumber/' + numberAccount, { headers });
    }

    validatorListaObservado(identification: string): Observable<any> {
        return this.http.get(bbConsultas + '8083/api/bbConsultas/listaObservado?identificacion=' + identification +
        '&nombreCompleto=&paisNacimiento=', { headers: headersConsultas });
    }

    validatorExistenceSRI(identification: string): Observable<any> {
        return this.http.get(bbConsultas + '8081/api/bbConsultas/sri/contribuyente/' + identification, { headers: headersConsultas });
    }

    validatorExistenceRC(identification: string): Observable<any> {
        return this.http.get(bbConsultas + '8080/api/bbConsultas/regCivil/persona/' + identification, { headers: headersConsultas });
    }

    validatorExistenceBB(identification: string): Observable<any> {
        return this.http.get(urlClient + '/findClientById/' + identification, { headers });
    }

    getProvince(): Observable<any> {
        return this.http.get(bbConsultas + '8081/api/bbConsultas/sri/ubicacion/tipo/PROVINCIA', { headers: headersConsultas });
    }

    getUbication(reference: string, type: string): Observable<any> {
        return this.http.get(bbConsultas + '8081/api/bbConsultas/sri/ubicacion/tipo?referencia=' + reference +
        '&tipo=' + type + '', { headers: headersConsultas });
    }

    getClientsByType(type: string): Observable<any> {
        return this.http.get(urlClient + '/findClientByType/' + type, { headers });
    }

    updateClient(client: Client): Observable<any> {
        const params = JSON.stringify(client);
        return this.http.put(urlClient + '/update', params, { headers });
    }

    getClientById(identification: string): Observable<any> {
        return this.http.get(urlClient + '/findClientById/' + identification, { headers });
    }
}
