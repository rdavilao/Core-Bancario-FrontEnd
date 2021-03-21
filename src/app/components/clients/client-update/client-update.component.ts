import { Component, OnInit } from '@angular/core';
import { Address } from '../../../models/client/address';
import { Contributor } from '../../../models/client/contributor';
import { LegalRepresentative } from '../../../models/client/legalRepresentative';
import { Client } from '../../../models/client/client';
import { Phone } from 'src/app/models/client/phone';
import { ClientService } from '../../../services/client.service';

@Component({
  selector: 'app-client-update',
  templateUrl: './client-update.component.html',
  styleUrls: ['./client-update.component.css'],
  providers: [ClientService]
})
export class ClientUpdateComponent implements OnInit {

  public identification: string;
  public client: Client;
  public isContributor: boolean;
  public status: string;
  public statusAddress: string;
  public statusPhone: string;
  public contributor: Contributor;
  public legalRepresentative: LegalRepresentative;
  public address: Address;
  public phone: Phone;
  public addresses: Address[];
  public phones: Phone[];
  public provinces: string[];
  public cantones: string[];
  public parishes: string[];
  public provinceAux: string;
  public cantonAux: string;
  public parishAux: string;
  public activateChangeAddress: string;
  public activateForms: string;
  public changePlace: string;
  public iAux: number;

  constructor(
    private _clientService: ClientService,
    ) {
    this.activateChangeAddress = '';
    this.identification = '';
    this.activateForms = '';
    this.changePlace = '';
    this.client = new Client(null, null, null, null, null, new Date(), new Array<Address>(), '', new Array<Phone>(), null, null);
    this.address = new Address(null, null, null, null, null, 'PICHINCHA', 'QUITO', 'ALANGASI');
    this.phone = new Phone('', '');
    this.addresses = new Array<Address>();
    this.phones = new Array<Phone>();
    this.provinces = this.loadProvinces();
    this.cantones = new Array<string>();
    this.parishes = new Array<string>();
  }

  ngOnInit(): void {
    this._clientService.getClientById(this.identification).subscribe(
      response => {
        this.client = response;
        this.addresses = this.client.addresses;
        this.phones = this.client.phones;
      }
    )
  }

  onSubmit(form) { 
  }

  confirmUpdate() {
    this._clientService.updateClient(this.client).subscribe(
      response =>{
        this.status = 'success';
      }
    )
  }

  activateForm(option){
    if(this.activateForms == ''){
      this.activateForms = option;
    }else{
      this.activateForms = '';
    }      
  }

  activateChangePlace(){
    if(this.changePlace == ''){
      this.changePlace = 'change';
    }else{
      this.changePlace = '';
    }
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
    console.log(this.client);
    form.reset();
    this.statusAddress = 'success';
    setTimeout(()=>{
      this.statusAddress = '';
      this.activateForms = '';
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
      this.activateForms = '';
    },1000);
  }

  updateAddress(form, index) {
    this.addresses[index].type = form.form.value.type;
    this.addresses[index].mainStreet = form.form.value.mainStreet;
    this.addresses[index].sideStreet = form.form.value.sideStreet;
    this.addresses[index].number = form.form.value.number;
    this.addresses[index].reference = form.form.value.reference;
    this.client.addresses = this.addresses;
    console.log(this.addresses);
    this.statusAddress = 'successUpdate';
    setTimeout(()=>{
      this.statusAddress = '';
    },1000);
  }

  updatePhones(form, index) {
    this.phones[index].type = form.form.value.type;
    this.phones[index].value = form.form.value.value;
    this.client.phones = this.phones;
    this.statusPhone = 'successUpdate';
    setTimeout(()=>{
      this.statusPhone = '';
    },1000);
  }

  deleteAddress(index) {
    if(this.client.addresses.length > 1){
      this.client.addresses.splice(index,1);
    }else{
      this.statusAddress = 'failedDelete';
    }
    setTimeout(()=>{
      this.statusAddress = '';
    },2000);
  }

  deletePhone(index) {
    if(this.client.phones.length > 1){
      this.client.phones.splice(index,1);
    }else{
      this.statusPhone = 'failedDelete';
    }
    setTimeout(()=>{
      this.statusPhone = '';
    },1000);
  }

  changeAddress(i){
    this.activateChangeAddress = 'activate';
    this.iAux = i;
  }

  confirmChangeAddress(){
    this.activateChangeAddress = '';
    this.client.addresses[this.iAux].province = this.provinceAux;
    this.client.addresses[this.iAux].canton = this.cantonAux;
    this.client.addresses[this.iAux].parish = this.parishAux;
    this.iAux = null;

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
