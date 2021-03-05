import { Component, OnInit, ViewChild, AfterViewInit  } from '@angular/core';
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
export class AccountListComponent implements OnInit, AfterViewInit {

  public identification: string;
  public title: string;
  displayedColumns: string[] = ['number', 'type', 'creationDate', 'balance', 'status', 'actions'];
  dataSource = new MatTableDataSource();
  @ViewChild(MatSort, {static:true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(
    private _accountService: AccountService,  
    public dialog: MatDialog  
    ) { 
      this.title = "Listado de cuentas";
      this.identification = "";
    }

  ngOnInit(): void {
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

  onSubmit(form){
    this._accountService.getAccountsByIdentification(this.identification).subscribe(
      response => {
        this.dataSource.data = response;
      }
    );
  }
  
  openDialog(number) {
    const dialogRef = this.dialog.open(AccountUpdateComponent);
    dialogRef.componentInstance.number = number;
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

}
