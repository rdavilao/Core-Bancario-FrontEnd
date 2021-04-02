import { Component } from '@angular/core';
import { Transaction } from '../../../models/transaction';
import { TransactionService } from '../../../services/transaction.service';
import { MatDialog } from '@angular/material/dialog';
import { BasicServicesComponent } from '../basic-services/basic-services.component';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css'],
  providers: [TransactionService]
})
export class TransactionComponent {

  public title: string;
  public transaction: Transaction;
  public status: string;
  public typeP: string;
  public showT: string;
  public img: string;

  constructor(
    private transactionService: TransactionService,
    public dialog: MatDialog
  ) {
    this.title = 'Crear transacción';
    this.typeP = 'luz';
    this.transaction = new Transaction('', '', '', new Date(), 'Deposito', '', 0, 0);
  }

  newTransaction(form): void {
    this.showT = '';
    this.img = '';
    this.status = '';
    form.reset();
  }

  onSubmit(): void {
    this.transaction.description = 'La persona con ci: ' + this.transaction.identification +
      ' realizó un ' + this.transaction.type + ' de ' + this.typeP + ' con valor de '
      + this.transaction.mont + ' a la cuenta ' + this.transaction.account;
    this.transaction.account = '270000000001';
    this.transactionService.saveTransaction(this.transaction).subscribe(
      response => {
        if (response == null) {
          this.showT = 'success';
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

  openModal(identification: string): void {
    const dialogRef = this.dialog.open(BasicServicesComponent);
    dialogRef.componentInstance.numeroMedidor = identification;
    dialogRef.componentInstance.tipoPago = this.typeP;
    dialogRef.afterClosed().subscribe();
  }
}
