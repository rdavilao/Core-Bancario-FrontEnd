import { Component, OnInit } from '@angular/core';
import { CreditCardRQ } from '../../../models/creditCard';
import { Account } from '../../../models/account';
import { CreditCardService } from '../../../services/creditCard.service';
import { AccountService } from '../../../services/account.service';

@Component({
  selector: 'app-credit-card-list',
  templateUrl: './credit-card-list.component.html',
  styleUrls: ['./credit-card-list.component.css'],
  providers: [CreditCardService, AccountService]
})
export class CreditCardListComponent implements OnInit {

  public title: string;
  public identification: string;
  public type: number;
  public _i:number;
  public creditCards: CreditCardRQ[];
  public accounts: Account;

  constructor(
    private _creditCardService: CreditCardService,
    private _accountService: AccountService
  ) {
    this.type = 4;
    this.title = "Lista de tarjetas de crédito";
  }

  ngOnInit(): void {
  }

  getCreditCard(form) {
    this._creditCardService.getCreditCardsByIdentificationAndType(this.identification,this.type).subscribe(
      response => {
        if(response){
          this.creditCards = response;
        }
      },
      error => {
        console.log(<any>error);
      }
    );
  }

}
