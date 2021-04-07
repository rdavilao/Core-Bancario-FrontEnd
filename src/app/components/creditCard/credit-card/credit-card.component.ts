import { Component } from '@angular/core';
import { CreditCard, CreditCardRQ } from '../../../models/creditCard';
import { CreditCardService } from '../../../services/creditCard.service';
import { Account } from '../../../models/account';
import { AccountService } from '../../../services/account.service';

@Component({
  selector: 'app-credit-card',
  templateUrl: './credit-card.component.html',
  styleUrls: ['./credit-card.component.css'],
  providers: [AccountService, CreditCardService]
})
export class CreditCardComponent {

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
    private accountService: AccountService,
    private creditCardService: CreditCardService
  ) {
    this.title = 'Creación de tarjetas de crédito';
    this.account = new Account(null, 0, '', null, null, 0, '');
    this.creditCard = new CreditCard(null, 0, '', 0, '', null, null, '');
    this.creditCardRQ = new CreditCardRQ(null, '', 0, null, 0);
    this.creditCards = new Array<CreditCardRQ>();
  }

  getCreditCards(): void {
    this.creditCardService.getCreditCardsByIdentificationAndType(this.identification, parseInt(this.type, 10)).subscribe(
      response => {
        this.creditCards = response;
        console.log(this.creditCards);
        for (const creditCard of this.creditCards) {
          this.accountService.getAccountByNumber(creditCard.account).subscribe(
            res => {
              creditCard.account = res.codigo;
            }
          );
        }
      }
    );
  }

  onSubmit(): void {
    if (this.creditCardAditional === 'no') {
      this.account.TYPE = parseInt(this.type, 10);
      this.account.CLIENT_IDENTIFICATION = this.identification;
      this.accountService.saveAccount(this.account).subscribe(
        response => {
          console.log(response);
          this.accountService.getLastAccountByIdentification(this.identification).subscribe(
            res => {
              this.creditCardService.saveCreditCard(parseInt(res.codigo, 10), 200).subscribe(
                respon => {
                  console.log(respon);
                  this.showA = 'success';
                  setTimeout(() => {
                    this.showA = '';
                  }, 1500);
                }, error => {
                  console.log(error);
                  this.showA = 'failed';
                }
              );
            }
          );
        },
        error => {
          console.log(error);
          this.showA = 'failed';
        }
      );
    } else {
      this.creditCardService.saveCreditCard(parseInt(this.numberAccount, 10), 200).subscribe(
        response => {
          this.showA = 'success';
          setTimeout(() => {
            this.showA = '';
          }, 1500);
        }, error => {
          this.showA = 'failed';
        }
      );
    }
  }
}
