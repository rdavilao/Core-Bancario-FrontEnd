import { Component, OnInit } from '@angular/core';
import { CreditCard } from '../../../models/creditCard';
import { CreditCardRQ } from '../../../models/creditCard';
import { CreditCardService } from '../../../services/creditCard.service';
import { Account } from '../../../models/account';
import { AccountService } from '../../../services/account.service';

@Component({
  selector: 'app-credit-card',
  templateUrl: './credit-card.component.html',
  styleUrls: ['./credit-card.component.css'],
  providers: [AccountService, CreditCardService]
})
export class CreditCardComponent implements OnInit {

  public title: string;
  public creditCardAditional: string;
  public identification: string;
  public showA: string;
  public type: string;
  public account: Account;
  public creditCard: CreditCard;
  public creditCardRQ: CreditCardRQ;
  public creditCards: CreditCardRQ[];
  public numberAccount: string;

  constructor(
    private _accountService: AccountService,
    private _creditCardService: CreditCardService
  ) {
    this.title = "Creación de tarjetas de crédito";
    this.account = new Account(null,0,'',null,null,0,'');
    this.creditCard = new CreditCard(null,0,'',0,'',null,null,'');
    this.creditCardRQ = new CreditCardRQ(null,'',0,null,0);
    this.creditCards = new Array<CreditCardRQ>();
  }

  ngOnInit(): void {
  }

  getCreditCards() {
    this._creditCardService.getCreditCardsByIdentificationAndType(this.identification, parseInt(this.type)).subscribe(
      response => {
        this.creditCards = response;
        console.log(this.creditCards);
        for(let creditCard of this.creditCards){
          this._accountService.getAccountByNumber(creditCard.account).subscribe(
            res => {
              creditCard.account = res.codigo;
            }
          )
        }
      }
    )
  }

  onSubmit(form){
    if(this.creditCardAditional == 'no'){
      this.account.TYPE = parseInt(this.type);
      this.account.CLIENT_IDENTIFICATION = this.identification;
      this._accountService.saveAccount(this.account).subscribe(
        response => {
          this._accountService.getLastAccountByIdentification(this.identification).subscribe(
            res => {
              this._creditCardService.saveCreditCard(parseInt(res.codigo), 200).subscribe(
                respon => {
                  this.showA = 'success';
                  setTimeout(() => {
                    this.showA = '';
                  },1500);
                }, error => {
                  this.showA = 'failed';
                }
              );
            }
          )
        },
        error => {
          this.showA = 'failed';
        }
      );
    }else{
      this._creditCardService.saveCreditCard(parseInt(this.numberAccount), 200).subscribe(
        respon => {
          this.showA = 'success';
          setTimeout(() => {
            this.showA = '';
          },1500);
        }, error => {
          this.showA = 'failed';
        }
      );
    }
  }

}
