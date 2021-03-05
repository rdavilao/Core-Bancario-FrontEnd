import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../../services/account.service';

@Component({
  selector: 'app-account-update',
  templateUrl: './account-update.component.html',
  styleUrls: ['./account-update.component.css'],
  providers: [AccountService]
})
export class AccountUpdateComponent implements OnInit {

  public number: string;

  constructor(
    private _accountService: AccountService
  ) {
    this.number = "";
   }

  ngOnInit(): void {
  }

  confirm(){    
    this._accountService.updateStateAccount(this.number).subscribe();
  }

}
