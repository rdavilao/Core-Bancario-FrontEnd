import { Component, OnInit } from '@angular/core';
import { CreditCardService } from '../../../services/creditCard.service';

@Component({
  selector: 'app-credit-card-update',
  templateUrl: './credit-card-update.component.html',
  providers: [CreditCardService]
})
export class CreditCardUpdateComponent implements OnInit {

  public numberCreditCard: string;

  constructor(
    private creditCardService: CreditCardService
  ) { }

  ngOnInit(): void {
  }

  confirm(): void{
    this.creditCardService.updateStateCreditCard(this.numberCreditCard).subscribe();
  }

}
