import { Component } from '@angular/core';
import { CreditCardService } from '../../../services/creditCard.service';

@Component({
  selector: 'app-credit-card-update',
  templateUrl: './credit-card-update.component.html',
  providers: [CreditCardService]
})
export class CreditCardUpdateComponent {

  public numberCreditCard: string;

  constructor(
    private creditCardService: CreditCardService
  ) { }

  confirm(): void{
    this.creditCardService.updateStateCreditCard(this.numberCreditCard).subscribe();
  }

}
