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
  public cantonesClientUpdate: string[];
  public parishesClientUpdate: string[];
  public provinceAux: string;
  public cantonAux: string;
  public parishAux: string;
  public activateChangeAddress: string;
  public activateForms: string;
  public changePlace: string;
  public iAux: number;

  constructor(
    private clientService: ClientService,
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
    this.cantonesClientUpdate = new Array<string>();
    this.parishesClientUpdate = new Array<string>();
  }

  ngOnInit(): void {
    this.clientService.getClientById(this.identification).subscribe(
      response => {
        this.client = response;
        this.addresses = this.client.addresses;
        this.phones = this.client.phones;
      }
    );
  }

  confirmUpdate(): void {
    this.clientService.updateClient(this.client).subscribe(
      response => {
        this.status = 'success';
      }
    );
  }

  activateForm(option): void {
    if (this.activateForms === '') {
      this.activateForms = option;
    } else {
      this.activateForms = '';
    }
  }

  activateChangePlace(): void {
    if (this.changePlace === '') {
      this.changePlace = 'change';
    } else {
      this.changePlace = '';
    }
  }

  addAddress(form): void {
    const addressClientUpdate = new Address('', '', '', '', '', '', '', '');
    addressClientUpdate.type = form.form.value.type;
    addressClientUpdate.mainStreet = form.form.value.mainStreet;
    addressClientUpdate.sideStreet = form.form.value.sideStreet;
    addressClientUpdate.numberAddress = form.form.value.number;
    addressClientUpdate.reference = form.form.value.reference;
    addressClientUpdate.province = form.form.value.province;
    addressClientUpdate.canton = form.form.value.canton;
    addressClientUpdate.parish = form.form.value.parish;
    this.client.addresses.push(addressClientUpdate);
    form.reset();
    this.statusAddress = 'success';
    setTimeout(() => {
      this.statusAddress = '';
      this.activateForms = '';
    }, 1000);
  }

  addPhones(form): void {
    const phone = new Phone('', '');
    phone.type = form.form.value.type;
    phone.value = form.form.value.value;
    this.client.phones.push(phone);
    form.reset();
    this.statusPhone = 'success';
    setTimeout(() => {
      this.statusPhone = '';
      this.activateForms = '';
    }, 1000);
  }

  updateAddress(form, index: number): void {
    this.addresses[index].type = form.form.value.type;
    this.addresses[index].mainStreet = form.form.value.mainStreet;
    this.addresses[index].sideStreet = form.form.value.sideStreet;
    this.addresses[index].numberAddress = form.form.value.number;
    this.addresses[index].reference = form.form.value.reference;
    this.client.addresses = this.addresses;
    this.statusAddress = 'successUpdate';
    setTimeout(() => {
      this.statusAddress = '';
    }, 1000);
  }

  updatePhones(form, index: number): void {
    this.phones[index].type = form.form.value.type;
    this.phones[index].value = form.form.value.value;
    this.client.phones = this.phones;
    this.statusPhone = 'successUpdate';
    setTimeout(() => {
      this.statusPhone = '';
    }, 1000);
  }

  deleteAddress(index: number): void {
    if (this.client.addresses.length > 1) {
      this.client.addresses.splice(index, 1);
    } else {
      this.statusAddress = 'failedDelete';
    }
    setTimeout(() => {
      this.statusAddress = '';
    }, 2000);
  }

  deletePhone(index: number): void {
    if (this.client.phones.length > 1) {
      this.client.phones.splice(index, 1);
    } else {
      this.statusPhone = 'failedDelete';
    }
    setTimeout(() => {
      this.statusPhone = '';
    }, 1000);
  }

  changeAddress(i: number): void {
    this.activateChangeAddress = 'activate';
    this.iAux = i;
  }

  confirmChangeAddress(): void {
    this.activateChangeAddress = '';
    this.client.addresses[this.iAux].province = this.provinceAux;
    this.client.addresses[this.iAux].canton = this.cantonAux;
    this.client.addresses[this.iAux].parish = this.parishAux;
    this.iAux = null;

  }

  loadProvinces(): any {
    const provincesClientUpdate = new Array<string>();
    this.clientService.getProvince().subscribe(
      response => {
        for (const item of response) {
          provincesClientUpdate.push(item);
        }
      }
    );
    this.loadCantones('PICHINCHA');
    this.loadParish('QUITO');
    return provincesClientUpdate;
  }

  loadCantones(province): void {
    this.cantonesClientUpdate = new Array<string>();
    this.clientService.getUbication(province, 'CANTON').subscribe(
      response => {
        for (const item of response) {
          this.cantonesClientUpdate.push(item);
        }
      }
    );
  }

  loadParish(canton): void {
    this.parishesClientUpdate = new Array<string>();
    this.clientService.getUbication(canton, 'PARROQUIA').subscribe(
      response => {
        for (const item of response) {
          this.parishesClientUpdate.push(item);
        }
      }
    );
  }
}
