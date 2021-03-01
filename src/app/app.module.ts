import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { routing, appRoutingProviders } from './app.routing';
import { AppComponent } from './app.component';
import { ClientComponent } from './components/client/client.component';
import { AccountComponent } from './components/account/account.component';
import { TransactionComponent } from './components/transactions/transaction/transaction.component';
import { TransactionListComponent } from './components/transactions/transaction-list/transaction-list.component';
import { ErrorComponent } from './components/error/error.component';
import { NavigationComponent } from './shared/navigation/navigation.component';
import {SharedStyleModule } from './shared/shared-style/shared-style.module';
import { CreditCardComponent } from './components/creditCard/credit-card/credit-card.component';
import { CreditCardListComponent } from './components/creditCard/credit-card-list/credit-card-list.component';


@NgModule({
  declarations: [
    AppComponent,
    ClientComponent,
    AccountComponent,
    TransactionComponent,
    TransactionListComponent,
    NavigationComponent,
    ErrorComponent,
    CreditCardComponent,
    CreditCardListComponent
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
