import { Component } from '@angular/core';
import { AccountService } from '../../../services/account.service';

@Component({
  selector: 'app-account-update',
  templateUrl: './account-update.component.html',
  styleUrls: ['./account-update.component.css'],
  providers: [AccountService]
})
export class AccountUpdateComponent {

  public account: string;

  constructor(
    private accountService: AccountService
  ) {
    this.account = '';
   }

  confirm(): void {
    this.accountService.updateStateAccount(this.account).subscribe();
  }

}
