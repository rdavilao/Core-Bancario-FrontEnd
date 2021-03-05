import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ClientService } from '../../../services/client.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { ClientUpdateComponent } from '../client-update/client-update.component'

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.css'],
  providers: [ClientService]
})
export class ClientListComponent implements OnInit, AfterViewInit {

  public typeClient: string;
  public title: string;
  displayedColumns: string[];
  dataSource = new MatTableDataSource();
  @ViewChild(MatSort, {static:true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(
    private _clientService: ClientService,  
    public dialog: MatDialog  
  ) { 
    this.title = "Listado de clientes";
    this.typeClient = "";
  }

  openDialog(identification) {
    const dialogRef = this.dialog.open(ClientUpdateComponent);

    dialogRef.componentInstance.identification = identification;
    if(this.typeClient == "Natural"){
      dialogRef.componentInstance.isContributor = false;
    }else{
      dialogRef.componentInstance.isContributor = true;
    }

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
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
  
  nestedFilterCheck(search, data, key) {
    if (typeof data[key] === 'object') {
      for (const k in data[key]) {
        if (data[key][k] !== null) {
          search = this.nestedFilterCheck(search, data[key], k);
        }
      }
    } else {
      search += data[key];
    }
    return search;
  }

  onSubmit(form){
    this._clientService.getClientsByType(this.typeClient).subscribe(
      response => {
        this.dataSource.data = response;
        console.log(this.dataSource.data);
      }
    );
    if(this.typeClient == "Juridico"){
      this.displayedColumns = ['identification', 'bussinessName', 'tradeName', 'legalRepresentative', 'email', 'addresses', 'phones', 'actions'];
    }else{
      this.displayedColumns = ['identification', 'names', 'surnames', 'email', 'addresses', 'phones', 'actions'];
    }
  }

}
