import { Component, OnInit } from '@angular/core';
import { Transaction } from 'src/app/models/transaction';
import { TransactionService } from 'src/app/services/transaction.service';

@Component({
  selector: 'app-basic-services',
  templateUrl: './basic-services.component.html',
  styleUrls: ['./basic-services.component.css'],
  providers: [TransactionService]
})
export class BasicServicesComponent implements OnInit {

  public numeroMedidor: string;
  public tipoPago: string;
  public validation: string;
  private transaction: Transaction;
  public mont: number;

  constructor(
    private transactionService: TransactionService,
  ) {
    this.validation = '';
    this.transaction = new Transaction('', '', '', null, 'Pago', '', 0, null);
  }

  ngOnInit(): void {
    if (this.tipoPago === 'agua') {
      this.transactionService.getMontPlanillaAguaPotable(this.numeroMedidor).subscribe(
        (res) => {
          this.mont = res.monto;
        },
        (error) => {
          this.validation = 'Número de medidor incorrecto';
        }
      );
    } else {
      this.transactionService.getMontPlanillaElectrica(this.numeroMedidor).subscribe(
        (res) => {
          this.mont = res.monto;
        },
        (error) => {
          console.error(error);
          this.validation = 'Número de medidor incorrecto';
        }
      );
    }
  }

  confirmarPago(): void {
    this.transaction.identification = this.numeroMedidor;
    this.transaction.account = this.numeroMedidor;
    this.transaction.mont = this.mont;
    if (this.tipoPago === 'agua') {
      this.transaction.description = 'Pago total de ' + this.mont + ' del servicio de agua potable.';
      this.transactionService.payMonthPlanillaAguaPotable(this.numeroMedidor).subscribe(
        res => {
          console.log(res);
          this.validation = 'Pago realizado correctamente.';
          this.transactionService.saveTransaction(this.transaction).subscribe();
        }
      );
    } else {
      this.transaction.description = 'Pago total de ' + this.mont + ' del servicio de luz eléctrica.';
      this.transactionService.payMonthPlanillaElectrica(this.numeroMedidor).subscribe(
        res => {
          console.log(res);
          this.validation = 'Pago realizado correctamente.';
          this.transactionService.saveTransaction(this.transaction).subscribe();
        }
      );
    }
  }

}
