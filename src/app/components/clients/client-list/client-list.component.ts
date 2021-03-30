import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { ClientService } from '../../../services/client.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { ClientUpdateComponent } from '../client-update/client-update.component';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.css'],
  providers: [ClientService]
})
export class ClientListComponent implements AfterViewInit {

  public typeClient: string;
  public title: string;
  displayedColumns: string[];
  dataSourceClient = new MatTableDataSource();
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private clientService: ClientService,
    public dialog: MatDialog
  ) {
    this.title = 'Listado de clientes';
    this.typeClient = '';
  }

  openDialog(identification: string): void {
    const dialogRef = this.dialog.open(ClientUpdateComponent);

    dialogRef.componentInstance.identification = identification;
    if (this.typeClient === 'Natural') {
      dialogRef.componentInstance.isContributor = false;
    } else {
      dialogRef.componentInstance.isContributor = true;
    }

    dialogRef.afterClosed().subscribe();
  }

  ngAfterViewInit(): void {
    this.dataSourceClient.paginator = this.paginator;
    this.dataSourceClient.sort = this.sort;
  }

  applyFilter(event: Event): any {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceClient.filter = filterValue.trim().toLowerCase();
    this.dataSourceClient.filterPredicate = (data: any, filter) => {
      const dataStr = JSON.stringify(data).toLowerCase();
      return dataStr.indexOf(filter) !== -1;
    };
  }

  onSubmit(): void {
    this.clientService.getClientsByType(this.typeClient).subscribe(
      response => {
        this.dataSourceClient.data = response;
      }
    );
    if (this.typeClient === 'Juridico') {
      this.displayedColumns = ['identification', 'bussinessName', 'tradeName', 'legalRepresentative', 'email', 'addresses', 'phones', 'actionsClientList'];
    } else {
      this.displayedColumns = ['identification', 'names', 'surnames', 'email', 'addresses', 'phones', 'actionsClientList'];
    }
  }
}
