import { Component, OnInit } from '@angular/core';
import { Transaction } from '../../models/transaction';
import { TransactionService } from '../../services/transaction.service';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css'],
  providers: [TransactionService]
})
export class TransactionComponent implements OnInit {

  public title: string;
  public transaction: Transaction;

  constructor(
    private _transactionService: TransactionService
  ) { 
    this.title = "Crear transaccion";
    this.transaction = new Transaction('','','',new Date(),'','',0,0);
  }

  ngOnInit(): void {
  }

  onSubmit(form){
    console.log(this.transaction);
    this._transactionService.saveTransaction(this.transaction).subscribe(
      response => {
        console.log(response);
      },
      error => {
        console.log(<any> error);
      }
    )
  }

}
