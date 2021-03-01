import { Component, OnInit } from '@angular/core';
import { Transaction } from '../../../models/transaction';
import { TransactionService } from '../../../services/transaction.service';

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.css'],
  providers: [TransactionService]
})
export class TransactionListComponent implements OnInit {

  public title: string;
  public identification:string;
  public limit:number;
  public type:string;
  public transactions: Transaction[];

  constructor(
    private _transactionService: TransactionService
  ) { 
    this.title = "Lista de transacciones";
    this.type = "all";
    this.limit = 1;
  }

  ngOnInit(): void {
  }

  getTransactions(form) {
    if(this.type == "all"){
      this._transactionService.getTransactions(this.identification,this.limit).subscribe(
        response => {
          console.log(response);
          if(response){
            this.transactions = response;
          }
        },
        error => {
          this.transactions = null;
          console.log(<any>error);
        }
      );
    }else{
      this._transactionService.getTransactionsByType(this.identification,this.limit,this.type).subscribe(
        response => {
          console.log(response);
          if(response){
            this.transactions = response;
          }
        },
        error => {
          this.transactions = null;
          console.log(<any>error);
        }
      );
    }
    
  }

}
