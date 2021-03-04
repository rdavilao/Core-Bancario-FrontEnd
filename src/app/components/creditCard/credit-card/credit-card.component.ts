import { Component, OnInit } from '@angular/core';
import { Transaction } from '../../../models/transaction';
import { TransactionService } from '../../../services/transaction.service';

@Component({
  selector: 'app-credit-card',
  templateUrl: './credit-card.component.html',
  styleUrls: ['./credit-card.component.css'],
  providers: [TransactionService]
})
export class CreditCardComponent implements OnInit {

  public title: string;
  public transaction: Transaction;
  public status: string;

  constructor(
    private _transactionService: TransactionService
  ) {
    this.title = "Pago de tarjetas de crédito.";
    this.transaction = new Transaction('', '', '', new Date(), 'Pago Tarjeta de crédito', '', 0, 0);
  }

  ngOnInit(): void {
  }

  onSubmit(form) {
    this.transaction.identification = this.transaction.account;
    this.transaction.description = "Pago de : " + this.transaction.mont + " de la tarjeta  " +
      this.transaction.account + ", saldo pendiente: " + this.transaction.balanceAccount;
    this._transactionService.saveTransaction(this.transaction).subscribe(
      response => {
        if (response == null) {
          this.status = 'success';
          form.reset();
          setTimeout(()=>{
            this.status = '';  
          },1000);
        } else {
          this.status = 'failed';
        }
      },
      error => {
        console.log(<any>error);
      }
    )
  }

}
