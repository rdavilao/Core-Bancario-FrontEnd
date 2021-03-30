import { Component } from '@angular/core';
import { CreditCardRQ } from '../../../models/creditCard';
import { CreditCardService } from '../../../services/creditCard.service';

@Component({
  selector: 'app-credit-card-list',
  templateUrl: './credit-card-list.component.html',
  styleUrls: ['./credit-card-list.component.css'],
  providers: [CreditCardService]
})
export class CreditCardPaymentListComponent {

  public title: string;
  public identification: string;
  public img: string;
  public type: number;
  public creditCards: CreditCardRQ[];

  constructor(
    private creditCardService: CreditCardService,
  ) {
    this.type = 4;
    this.title = 'Lista de tarjetas de crédito';
  }

  getCreditCard(): void {
    if (this.type === 4) {
      this.img = '../../../../assets/visa.png';
    } else {
      this.img = '../../../../assets/mastercard.png';
    }
    this.creditCardService.getCreditCardsByIdentificationAndType(this.identification, this.type).subscribe(
      response => {
        if (response) {
          this.creditCards = response;
        }
      },
      error => {
        this.creditCards = [];
        console.log(error);
      }
    );
  }

}
