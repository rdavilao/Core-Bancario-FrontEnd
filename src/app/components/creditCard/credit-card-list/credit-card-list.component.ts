import { Component, OnInit } from '@angular/core';
import { CreditCardRQ } from '../../../models/creditCard';
import { Account } from '../../../models/account';
import { CreditCardService } from '../../../services/creditCard.service';
import { AccountService } from '../../../services/account.service';

@Component({
  selector: 'app-credit-card-list',
  templateUrl: './credit-card-list.component.html',
  styleUrls: ['./credit-card-list.component.css'],
  providers: [CreditCardService]
})
export class CreditCardListComponent implements OnInit {

  public title: string;
  public identification: string;
  public img: string;
  public type: number;
  public creditCards: CreditCardRQ[];

  constructor(
    private _creditCardService: CreditCardService,
  ) {
    this.type = 4;
    this.title = "Lista de tarjetas de crédito";
  }

  ngOnInit(): void {
  }

  getCreditCard(form) {
    if(this.type == 4){
      this.img = "../../../../assets/visa.png";
    }else{
      this.img = "../../../../assets/mastercard.png";
    }
    this._creditCardService.getCreditCardsByIdentificationAndType(this.identification,this.type).subscribe(
      response => {
        if(response){
          this.creditCards = response;
        }
      },
      error => {
        this.creditCards = [];
        console.log(<any>error);
      }
    );
  }

}
