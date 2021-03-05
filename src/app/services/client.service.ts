import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Client } from '../models/client/client';
import { urlClient } from '../../environments/environment';

let headers = new HttpHeaders().set('Content-Type','application/json');

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
        return this._http.post(urlClient+'/create', params, {headers: headers});
    }

    getAccountByNumber(number: string): Observable<any>{
        return this._http.get(urlClient+'/findAccountByNumber/'+number,{headers: headers});
    }

    validatorListaObservado(identification: string): Observable<any>{
        return this._http.get('http://bbconsultas.southcentralus.cloudapp.azure.com:8083/api/bbConsultas/listaObservado?identificacion='+identification+'&nombreCompleto=&paisNacimiento=', {headers: headers});
    }

    validatorExistenceSRI(identification: string): Observable<any>{
        return this._http.get('http://bbconsultas.southcentralus.cloudapp.azure.com:8081/api/bbConsultas/sri/contribuyente/'+identification, {headers: headers});
    }

    validatorExistenceRC(identification: string): Observable<any>{
        return this._http.get('http://bbconsultas.southcentralus.cloudapp.azure.com:8080/api/bbConsultas/regCivil/persona/'+identification, {headers: headers});
    }

    validatorExistenceBB(identification: string): Observable<any>{
        return this._http.get('http://18.209.218.56:8081/api/corebancario/client/findClientById/'+identification, {headers: headers});
    }

    getProvince(): Observable<any>{
        return this._http.get('http://bbconsultas.southcentralus.cloudapp.azure.com:8081/api/bbConsultas/sri/ubicacion/tipo/PROVINCIA', {headers: headers});
    }

    getUbication(reference: string, type: string): Observable<any>{
        return this._http.get('http://bbconsultas.southcentralus.cloudapp.azure.com:8081/api/bbConsultas/sri/ubicacion/tipo?referencia='+reference+'&tipo='+type+'', {headers: headers});
    }

    getClientsByType(type: string): Observable<any>{
        return this._http.get(urlClient+'/findClientByType/'+type, {headers: headers});
    }

    updateClient(client: Client): Observable<any>{
        let params = JSON.stringify(client);
        return this._http.put(urlClient+'/update', params, {headers: headers});
    }

    getClientById(identification: string): Observable<any>{
        return this._http.get(urlClient+'/findClientById/'+identification, {headers: headers});
    }
}