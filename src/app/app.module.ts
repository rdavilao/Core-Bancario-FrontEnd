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
import { NavigationComponent } from './shared/navigation/navigation.component';
import { SharedStyleModule } from './shared/shared-style/shared-style.module';
import { CreditCardPaymentComponent } from './components/creditCardPayment/credit-card/credit-card.component';
import { CreditCardPaymentListComponent } from './components/creditCardPayment/credit-card-list/credit-card-list.component';
import { AccountUpdateComponent } from './components/accounts/account-update/account-update.component';
import { AccountListComponent } from './components/accounts/account-list/account-list.component';
import { CreditCardUpdateComponent } from './components/creditCard/credit-card-update/credit-card-update.component';
import { CreditCardComponent } from './components/creditCard/credit-card/credit-card.component';
import { CreditCardListComponent } from './components/creditCard/credit-card-list/credit-card-list.component';
import { BasicServicesComponent } from './components/transactions/basic-services/basic-services.component';
import { LoginComponent } from './components/login/login.component';


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
    CreditCardPaymentComponent,
    CreditCardPaymentListComponent,
    AccountUpdateComponent,
    AccountListComponent,
    CreditCardUpdateComponent,
    CreditCardComponent,
    CreditCardListComponent,
    BasicServicesComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    routing,
    BrowserAnimationsModule,
    SharedStyleModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [
    appRoutingProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
