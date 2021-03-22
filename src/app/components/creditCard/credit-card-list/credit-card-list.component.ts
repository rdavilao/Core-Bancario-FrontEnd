import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { CreditCardService } from '../../../services/creditCard.service';
import { CreditCardUpdateComponent } from '../credit-card-update/credit-card-update.component';
import { CreditCardRQ } from '../../../models/creditCard';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-credit-card-list',
  templateUrl: './credit-card-list.component.html',
  styleUrls: ['./credit-card-list.component.css'],
  providers: [CreditCardService]
})
export class CreditCardListComponent implements AfterViewInit {

  public title: string;
  public identification: string;
  public creditCards: CreditCardRQ[];
  displayedColumns: string[] = ['number', 'account', 'balanceAccount', 'limitAccount', 'expirationDate', 'actions'];
  dataSource = new MatTableDataSource();
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private creditCardService: CreditCardService,
    public dialog: MatDialog
  ) {
    this.title = 'Lista de tarjetas de crédito';
  }

  getCreditCard(): void {
    this.creditCardService.getCreditCardsByIdentification(this.identification).subscribe(
      response => {
        if (response) {
          this.dataSource.data = response;
        }
      },
      error => {
        this.creditCards = [];
        console.log(error);
      }
    );
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event): any {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.dataSource.filterPredicate = (data: any, filter) => {
      const dataStr = JSON.stringify(data).toLowerCase();
      return dataStr.indexOf(filter) !== -1;
    };
  }

  openDialog(numberCreditCard): void {
    const dialogRef = this.dialog.open(CreditCardUpdateComponent);
    dialogRef.componentInstance.numberCreditCard = numberCreditCard;
    dialogRef.afterClosed().subscribe();
  }

}
