import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
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
export class CreditCardListComponent implements OnInit, AfterViewInit {

  public title: string;
  public identification: string;
  public creditCards: CreditCardRQ[];
  displayedColumns: string[] = ['number', 'account', 'balanceAccount', 'limitAccount', 'expirationDate', 'actions'];
  dataSource = new MatTableDataSource();
  @ViewChild(MatSort, {static:true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(
    private _creditCardService: CreditCardService,  
    public dialog: MatDialog
  ) {
    this.title = "Lista de tarjetas de crédito";
  }

  ngOnInit(): void {
  }

  getCreditCard(form) {
    this._creditCardService.getCreditCardsByIdentification(this.identification).subscribe(
      response => {
        if(response){
          this.dataSource.data = response;
          console.log(this.dataSource.data);
        }
      },
      error => {
        this.creditCards = [];
        console.log(<any>error);
      }
    );
  }
  
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.dataSource.filterPredicate = (data: any, filter) => {
      const dataStr =JSON.stringify(data).toLowerCase();
      return dataStr.indexOf(filter) != -1; 
    }
  }
  
  openDialog(number) {
    const dialogRef = this.dialog.open(CreditCardUpdateComponent);
    dialogRef.componentInstance.number = number;
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

}
