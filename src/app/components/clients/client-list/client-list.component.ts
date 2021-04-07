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

  public options: string;
  public title: string;
  public identification: string;
  public birthdate: string;
  public province: string;
  public provinces: [];
  displayedColumns: string[];
  dataSourceClient = new MatTableDataSource();
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private clientService: ClientService,
    public dialog: MatDialog
  ) {
    this.title = 'Listado de clientes';
    this.options = '1';
    this.provinces = this.loadProvinces();
  }

  openDialog(identification: string): void {
    const dialogRef = this.dialog.open(ClientUpdateComponent);

    dialogRef.componentInstance.identification = identification;
    if (identification.length === 10) {
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
    console.log(this.options);
    if (this.options === '1') {
      const client = [];
      this.clientService.getClientById(this.identification).subscribe(
        res => {
          client.push(res);
          this.dataSourceClient.data = client;
        }
      );
    } else if (this.options === '2') {
      this.clientService.getClientsByProvince(this.province).subscribe(
        res => {
          this.dataSourceClient.data = res;
        }
      );
    } else {
      this.birthdate += 'T00:00:00Z';
      this.clientService.getClientsByBirthdate(this.birthdate).subscribe(
        res => {
          this.dataSourceClient.data = res;
        }
      );
    }
    /*this.displayedColumns = ['identification', 'bussinessName',
    //'tradeName', 'legalRepresentative', 'email', 'addresses',
    //'phones', 'actionsClientList'];*/
    this.displayedColumns = ['identification', 'names', 'surnames', 'email', 'addresses', 'phones', 'actionsClientList'];
  }

  loadProvinces(): any {
    const provincesClient = new Array<string>();
    this.clientService.getProvince().subscribe(
      response => {
        for (const item of response) {
          provincesClient.push(item);
        }
      }
    );
    return provincesClient;
  }
}
