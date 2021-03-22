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
  public showT: string;
  public img: string;

  constructor(
    private transactionService: TransactionService
  ) {
    this.title = 'Crear transacción';
    this.typeP = 'luz';
    this.transaction = new Transaction('', '', '', new Date(), 'Deposito', '', 0, 0);
  }

  ngOnInit(): void {
  }

  newTransaction(form): void{
    this.showT = '';
    this.img = '';
    this.status = '';
    form.reset();
  }

  onSubmit(): void {
    if (this.transaction.type !== 'Pago') {
      this.transaction.description = 'La persona con ci: ' + this.transaction.identification + ' realizó un ' +
        this.transaction.type + ' de ' + this.transaction.mont + ' a la cuenta ' + this.transaction.account;
    } else {
      this.transaction.description = 'La persona con ci: ' + this.transaction.identification +
        ' realizó un ' + this.transaction.type + ' de ' + this.typeP + ' con valor de '
        + this.transaction.mont + ' a la cuenta ' + this.transaction.account;
      this.transaction.account = '270000000001';
    }
    this.transactionService.saveTransaction(this.transaction).subscribe(
      response => {
        if (response == null) {
          if (this.transaction.type === 'Retiro'){
            this.showT = 'successRetiro';
          }else{
            this.showT = 'success';
          }
          this.status = 'success';
          this.img = '../../../../assets/logo-bb-4.jpeg';
        } else {
          this.status = 'failed';
        }
      },
      error => {
        this.showT = '';
        this.img = '';
        this.status = 'failed';
        console.log(error);
      }
    );
  }
}
