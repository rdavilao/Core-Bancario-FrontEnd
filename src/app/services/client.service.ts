import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Client } from '../models/client/client';
import { urlClient } from '../../environments/environment';

@Injectable()
export class ClientService {

    constructor(
        private _http: HttpClient
    ) {
    }

    testService() {
        return "Probando el servicio de clientes"
    }

    saveClient(client: Client): Observable<any>{
        let params = JSON.stringify(client);
        let headers = new HttpHeaders().set('Content-Type','application/json');
        return this._http.post(urlClient+'/create', params, {headers: headers});
    }

    getAccountByNumber(number: string): Observable<any>{
        let headers = new HttpHeaders().set('Content-Type','application/json');
        return this._http.get(urlClient+'/findAccountByNumber/'+number,{headers: headers});
    }

    validatorListaObservado(identification: string): Observable<any>{
        let headers = new HttpHeaders().set('Content-Type','application/json');
        return this._http.get('http://3.227.175.235:8083/api/bbConsultas/listaObservado?identificacion='+identification+'&nombreCompleto=&paisNacimiento=', {headers: headers});
    }

    validatorExistenceSRI(identification: string): Observable<any>{
        let headers = new HttpHeaders().set('Content-Type','application/json');
        return this._http.get('http://3.227.175.235:8081/api/bbConsultas/sri/contribuyente/'+identification, {headers: headers});
    }

    validatorExistenceRC(identification: string): Observable<any>{
        let headers = new HttpHeaders().set('Content-Type','application/json');
        return this._http.get('http://3.227.175.235:8080/api/bbConsultas/regCivil/persona/'+identification, {headers: headers});
    }

    validatorExistenceBB(identification: string): Observable<any>{
        let headers = new HttpHeaders().set('Content-Type','application/json');
        return this._http.get('http://18.209.218.56:8081/api/corebancario/client/findClientById/'+identification, {headers: headers});
    }

    getProvince(): Observable<any>{
        let headers = new HttpHeaders().set('Content-Type','application/json');
        return this._http.get('http://bbconsultas.southcentralus.cloudapp.azure.com:8081/api/bbConsultas/sri/ubicacion/tipo/PROVINCIA', {headers: headers});
    }

    getUbication(reference: string, type: string): Observable<any>{
        let headers = new HttpHeaders().set('Content-Type','application/json');
        return this._http.get('http://bbconsultas.southcentralus.cloudapp.azure.com:8081/api/bbConsultas/sri/ubicacion/tipo?referencia='+reference+'&tipo='+type+'', {headers: headers});
    }
}