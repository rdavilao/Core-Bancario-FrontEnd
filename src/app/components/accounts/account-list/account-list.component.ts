import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { AccountService } from '../../../services/account.service';
import { AccountUpdateComponent } from '../account-update/account-update.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-account-list',
  templateUrl: './account-list.component.html',
  styleUrls: ['./account-list.component.css'],
  providers: [AccountService]
})
export class AccountListComponent implements AfterViewInit {

  public identification: string;
  public title: string;
  displayedColumns: string[] = ['number', 'type', 'creationDate', 'balance', 'status', 'actionsAccount'];
  dataSourceAccount = new MatTableDataSource();
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private accountService: AccountService,
    public dialog: MatDialog
  ) {
    this.title = 'Listado de cuentas';
    this.identification = '';
  }

  ngAfterViewInit(): void {
    this.dataSourceAccount.paginator = this.paginator;
    this.dataSourceAccount.sort = this.sort;
  }

  applyFilter(event: Event): any {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceAccount.filter = filterValue.trim().toLowerCase();
    this.dataSourceAccount.filterPredicate = (data: any, filter) => {
      const dataStr = JSON.stringify(data).toLowerCase();
      return dataStr.indexOf(filter) !== -1;
    };
  }

  onSubmit(): void {
    this.accountService.getAccountsByIdentification(this.identification).subscribe(
      response => {
        this.dataSourceAccount.data = response;
      }
    );
  }

  openDialogAccount(account: string): void {
    const dialogRef = this.dialog.open(AccountUpdateComponent);
    dialogRef.componentInstance.account = account;
    dialogRef.afterClosed().subscribe();
  }

}
