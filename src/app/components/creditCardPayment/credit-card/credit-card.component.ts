import { Component, OnInit } from '@angular/core';
import { Transaction } from '../../../models/transaction';
import { TransactionService } from '../../../services/transaction.service';

@Component({
  selector: 'app-credit-card',
  templateUrl: './credit-card.component.html',
  styleUrls: ['./credit-card.component.css'],
  providers: [TransactionService]
})
export class CreditCardPaymentComponent implements OnInit {

  public title: string;
  public transaction: Transaction;
  public status: string;
  public showT: string;
  public img: string;

  constructor(
    private _transactionService: TransactionService
  ) {
    this.title = "Pago de tarjetas de crédito.";
    this.transaction = new Transaction('', '', '', new Date(), 'Pago Tarjeta', '', 0, 0);
  }

  ngOnInit(): void {
  }

  newTransaction(form){
    
    this.showT = '';
    this.img = "";
    this.status = '';
    form.reset(); 
  }

  onSubmit(form) {
    this.transaction.identification = this.transaction.account;
    this.transaction.description = "Pago con monto de: " + this.transaction.mont + " de la tarjeta  " +
      this.transaction.account + ".";
    this._transactionService.saveTransactionTC(this.transaction).subscribe(
      response => {
        if (response == null) {
          this.status = 'success';
          this.showT = 'success';
          this.img = "../../../../assets/logo-bb-4.jpeg";
        } else {
          this.status = 'failed';
        }
      },
      error => {
        this.showT = '';
        this.img = "";
        console.log(<any>error);
      }
    )
  }

}
