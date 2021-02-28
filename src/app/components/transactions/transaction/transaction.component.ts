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
  public status:string;

  constructor(
    private _transactionService: TransactionService
  ) { 
    this.title = "Crear transaccion";
    this.transaction = new Transaction('','','',new Date(),'','',0,0);
  }

  ngOnInit(): void {
  }

  onSubmit(form){
    
    this.transaction.description = "La persona con ci: " + this.transaction.identification + " realizó un " + this.transaction.type + " de " + this.transaction.mont + " a la cuenta " + this.transaction.account;
    this._transactionService.saveTransaction(this.transaction).subscribe(
      response => {
        if(response == null){
          this.status = 'success';
          form.reset();
        }else{
          this.status = 'failed';
        }
      },
      error => {
        console.log(<any> error);
      }
    )
  }

}
