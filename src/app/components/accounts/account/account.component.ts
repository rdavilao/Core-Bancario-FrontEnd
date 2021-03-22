import { Component, OnInit } from '@angular/core';
import { Account } from '../../../models/account';
import { AccountService } from '../../../services/account.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
  providers: [AccountService]
})
export class AccountComponent implements OnInit {

  public title: string;
  public showA: string;
  public account: Account;

  constructor(
    private accountService: AccountService
  ) {
    this.title = 'Creación de cuentas';
    this.account = new Account(null, 1, '', null, null, 0, '');
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    console.log(this.account);
    this.accountService.saveAccount(this.account).subscribe(
      response => {
        console.log(response);
        this.showA = 'success';
      },
      error => {
        this.showA = 'failed';
        console.log(error);
      }
    );
  }

}
