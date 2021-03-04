import { Component, OnInit } from '@angular/core';
import { Account } from '../../../models/account';
import { Client } from '../../../models/client/client';
import { Address } from '../../../models/client/address';
import { Contributor } from '../../../models/client/contributor';
import { LegalRepresentative } from '../../../models/client/legalRepresentative';
import { ClientService } from '../../../services/client.service';
import { AccountService } from '../../../services/account.service';
import { Phone } from 'src/app/models/client/phone';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css'],
  providers: [ClientService, AccountService]
})
export class ClientComponent implements OnInit {

  public title: string;
  public account: Account;
  public client: Client;
  public contributor: Contributor;
  public legalRepresentative: LegalRepresentative;
  public address: Address;
  public phone: Phone;
  public addresses: Address[];
  public phones: Phone[];
  public provinces: string[];
  public cantones: string[];
  public parishes: string[];
  public validatorMensaje: string;
  public img: string;
  public isContributor: boolean;
  public status: string;
  public statusAddress: string;
  public statusPhone: string;

  constructor(
    private _clientService: ClientService,
    private _accountService: AccountService
  ) {
    this.validatorMensaje = '';
    this.img = '';
    this.isContributor = false;
    this.title = "Crear cliente";
    this.account = new Account(null,1,'',null,null,0,'');
    this.client = new Client(null, null, null, null, null, new Date(), new Array<Address>(), '', new Array, null, null);
    this.contributor = new Contributor('', '', null);
    this.legalRepresentative = new LegalRepresentative('', '', '');
    this.address = new Address(null, null, null, null, null, 'PICHINCHA', 'QUITO', 'ALANGASI');
    this.phone = new Phone('', '');
    this.addresses = new Array<Address>();
    this.phones = new Array<Phone>();
    this.provinces = this.loadProvinces();
    this.cantones = new Array<string>();
    this.parishes = new Array<string>();
  }

  ngOnInit(): void {
  }

  onSubmit(form) {
    this.account.CLIENT_IDENTIFICATION = this.client.identification;
    this._accountService.saveAccount(this.account).subscribe(
      response => {
        form.reset();
        this.addClient();
      },
      error => {
        this.status = 'failed';
      }
    );
    
  }

  addClient(){
    this._clientService.saveClient(this.client).subscribe(
      response => {
        if (response == null) {
          this.status = 'success';
          setTimeout(()=>{
            this.status = '';
            this.img = ''
          },1000);
        } else {
          this.status = 'failed';
        }
      },
      error => {
        console.log(<any>error);
      }
    )
  }

  validator() {
    if (this.client.identification.length == 10) {
      this._clientService.validatorExistenceRC(this.client.identification).subscribe(
        responseP => {
          this._clientService.validatorListaObservado(this.client.identification).subscribe(
            response => {
              this.img = '';
              this.validatorMensaje = "Persona encontrada en lista de observados por motivos de: ";
              for (var _i = 0; _i < response.persona.motivo.length; _i++) {
                this.validatorMensaje += response.persona.motivo[_i].descrpcion + ". ";
              }
            },
            error => {
              this._clientService.validatorExistenceBB(this.client.identification).subscribe(
                response =>{
                  this.img = '';
                  this.validatorMensaje = "La persona ya es cliente del Banco Banquito.";
                },
                error => {
                  this.isContributor = false;
                  this.validatorMensaje = '';
                  this.img = '../../../../assets/correct.png';
                  this.generateClient(responseP);
                }
              )
            }
          )
        }, error => {
          this.img = ''
          this.validatorMensaje = "Persona no registrada en el Registro Civil.";
        }
      )
    } else {
      this._clientService.validatorExistenceSRI(this.client.identification).subscribe(
        responseP => {
          this._clientService.validatorListaObservado(responseP.representanteLegal.cedula).subscribe(
            response => {
              this.img = ''
              this.validatorMensaje = "Representante legal encontrado en lista de observados por motivos de: ";
              for (var _i = 0; _i < response.persona.motivo.length; _i++) {
                this.validatorMensaje += response.persona.motivo[_i].descrpcion + ". ";
              }
            },
            error => {
              this._clientService.validatorExistenceBB(this.client.identification).subscribe(
                response =>{
                  this.img = '';
                  this.validatorMensaje = "Contribuyente registrado en el sistema de Banco Banquito.";
                },
                error => {
                  this.isContributor = true;
                  this.generateContributor(responseP);
                  this.validatorMensaje = '';
                  this.img = '../../../../assets/correct.png'
                }
              )
            }
          )
        }, error => {
          this.img = ''
          this.validatorMensaje = "Contribuyente no registrada en el SRI.";
        }
      )
    }
  }

  generateClient(response) {
    this.client.names = response.nombres;
    this.client.surnames = response.apellidos;
    this.client.genre = response.genero;
    this.client.birthdate = response.datosNacimiento.fechaNacimiento;
    this.client.nationality = response.nacionalidad.nombre;
  }

  generateContributor(response) {
    this.client.birthdate = response.fechaInicioActividades;
    this.client.names = response.razonSocial;
    for (let address of response.establecimiento) {
      var dir = new Address('', '', '', '', '', '', '', '');
      if(address.matriz){
        dir.type = "Matriz";
      }else{
        dir.type = "Sucursal";        
      }
      dir.mainStreet = address.ubicacionComercial.calle;
      dir.sideStreet = address.ubicacionComercial.interseccion;
      dir.number = address.ubicacionComercial.number;
      dir.province = address.ubicacionComercial.provincia;
      dir.canton = address.ubicacionComercial.canton;
      dir.parish = address.ubicacionComercial.PARROQUIA;
      this.client.addresses.push(dir);
    }
    this.legalRepresentative.identification = response.representanteLegal.cedula;
    this.legalRepresentative.names = response.representanteLegal.nombres;
    this.legalRepresentative.surnames = response.representanteLegal.apellidos;
    this.contributor.bussinessName = response.nombreComercial;
    this.contributor.tradeName = response.razonSocial;
    this.contributor.legalRepresentative = this.legalRepresentative;
    this.client.contributor = this.contributor;
    console.log(this.client);
  }

  addAddress(form) {
    var address = new Address('', '', '', '', '', '', '', '');
    address.type = form.form.value.type;
    address.mainStreet = form.form.value.mainStreet;
    address.sideStreet = form.form.value.sideStreet;
    address.number = form.form.value.number;
    address.reference = form.form.value.reference;
    address.province = form.form.value.province;
    address.canton = form.form.value.canton;
    address.parish = form.form.value.parish;
    this.client.addresses.push(address);
    form.reset();
    this.statusAddress = 'success';
    setTimeout(()=>{
      this.statusAddress = '';
    },1000);
  }

  addPhones(form) {
    var phone = new Phone('', '');
    phone.type = form.form.value.type;
    phone.value = form.form.value.value;
    this.client.phones.push(phone);
    form.reset();
    this.statusPhone = 'success';
    setTimeout(()=>{
      this.statusPhone = '';
    },1000);
  }

  loadProvinces() {
    var provinces = new Array<string>();
    this._clientService.getProvince().subscribe(
      response => {
        for (var item of response) {
          provinces.push(item);
        }
      }
    );
    this.loadCantones("PICHINCHA");
    this.loadParish("QUITO");
    return provinces;
  }

  loadCantones(province) {
    this.cantones = new Array<string>();
    this._clientService.getUbication(province, 'CANTON').subscribe(
      response => {
        for (var item of response) {
          this.cantones.push(item);
        }
      }
    );
  }

  loadParish(canton) {
    this.parishes = new Array<string>();
    this._clientService.getUbication(canton, 'PARROQUIA').subscribe(
      response => {
        for (var item of response) {
          this.parishes.push(item);
        }
      }
    );
  }

}
