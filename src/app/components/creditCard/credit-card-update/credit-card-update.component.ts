import { Component, OnInit } from '@angular/core';
import { CreditCardService } from '../../../services/creditCard.service';

@Component({
  selector: 'app-credit-card-update',
  templateUrl: './credit-card-update.component.html',
  styleUrls: ['./credit-card-update.component.css'],
  providers: [CreditCardService]
})
export class CreditCardUpdateComponent implements OnInit {

  public number: string;

  constructor(
    private _creditCardService: CreditCardService
  ) { }

  ngOnInit(): void {
  }

  confirm(){    
    this._creditCardService.updateStateCreditCard(this.number).subscribe();
  }

}
