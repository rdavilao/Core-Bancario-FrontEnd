import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { routing, appRoutingProviders } from './app.routing';
import { AppComponent } from './app.component';
import { ClientComponent } from './components/clients/client/client.component';
import { ClientUpdateComponent } from './components/clients/client-update/client-update.component';
import { ClientListComponent } from './components/clients/client-list/client-list.component';
import { AccountComponent } from './components/accounts/account/account.component';
import { TransactionComponent } from './components/transactions/transaction/transaction.component';
import { TransactionListComponent } from './components/transactions/transaction-list/transaction-list.component';
import { ErrorComponent } from './components/error/error.component';
import { NavigationComponent } from './shared/navigation/navigation.component';
import {SharedStyleModule } from './shared/shared-style/shared-style.module';
import { CreditCardComponent } from './components/creditCard/credit-card/credit-card.component';
import { CreditCardListComponent } from './components/creditCard/credit-card-list/credit-card-list.component';
import { AccountUpdateComponent } from './components/accounts/account-update/account-update.component';


@NgModule({
  declarations: [
    AppComponent,
    ClientComponent,
    ClientUpdateComponent,
    ClientListComponent,
    AccountComponent,
    TransactionComponent,
    TransactionListComponent,
    NavigationComponent,
    ErrorComponent,
    CreditCardComponent,
    CreditCardListComponent,
    AccountUpdateComponent
  ],
  imports: [
    BrowserModule,
    routing,
    BrowserAnimationsModule,
    SharedStyleModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    appRoutingProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
