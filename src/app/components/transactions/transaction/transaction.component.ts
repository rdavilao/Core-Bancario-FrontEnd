import { Component, OnInit } from '@angular/core';
import { Transaction } from '../../../models/transaction';
import { TransactionService } from '../../../services/transaction.service';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css'],
  providers: [TransactionService]
})
export class TransactionComponent implements OnInit {

  public title: string;
  public transaction: Transaction;
  public status: string;
  public typeP: string;

  constructor(
    private _transactionService: TransactionService
  ) {
    this.title = "Crear transacción";
    this.typeP = "luz";
    this.transaction = new Transaction('', '', '', new Date(), 'Depósito', '', 0, 0);
  }

  ngOnInit(): void {
  }

  onSubmit(form) {
    if (this.transaction.type != "Pago") {
      this.transaction.description = "La persona con ci: " + this.transaction.identification + " realizó un " +
        this.transaction.type + " de " + this.transaction.mont + " a la cuenta " + this.transaction.account;
    } else {
      this.transaction.description = "La persona con ci: " + this.transaction.identification +
        " realizó un " + this.transaction.type + " de " + this.typeP + " con valor de "
        + this.transaction.mont + " a la cuenta " + this.transaction.account;
      this.transaction.account = "2700000000001";
    }
    this._transactionService.saveTransaction(this.transaction).subscribe(
      response => {
        if (response == null) {
          this.status = 'success';
          form.reset();
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
