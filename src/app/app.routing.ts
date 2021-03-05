import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClientComponent } from './components/clients/client/client.component';
import { ClientUpdateComponent } from './components/clients/client-update/client-update.component';
import { ClientListComponent } from './components/clients/client-list/client-list.component';
import { AccountComponent } from './components/accounts/account/account.component';
import { AccountUpdateComponent } from './components/accounts/account-update/account-update.component';
import { AccountListComponent } from './components/accounts/account-list/account-list.component';
import { TransactionComponent } from './components/transactions/transaction/transaction.component';
import { TransactionListComponent } from './components/transactions/transaction-list/transaction-list.component';
import { CreditCardPaymentComponent } from './components/creditCardPayment/credit-card/credit-card.component';
import { CreditCardPaymentListComponent } from './components/creditCardPayment/credit-card-list/credit-card-list.component';
import { CreditCardComponent } from './components/creditCard/credit-card/credit-card.component';
import { CreditCardListComponent } from './components/creditCard/credit-card-list/credit-card-list.component';
import { ErrorComponent } from './components/error/error.component';
import { NavigationComponent } from './shared/navigation/navigation.component';
import { listLazyRoutes } from '@angular/compiler/src/aot/lazy_routes';

const appRoutes: Routes = [
    {path: '', component: ClientComponent},
    {path: 'client', component: ClientComponent},
    {path: 'client/createClient', component: ClientComponent},
    {path: 'client/updateclient', component: ClientUpdateComponent},
    {path: 'client/searchClient', component: ClientListComponent},
    {path: 'account', component: AccountComponent},
    {path: 'account/searchAccount', component: AccountListComponent},
    {path: 'transaction', component: TransactionComponent},
    {path: 'transaction/list', component: TransactionListComponent},
    {path: 'creditCardPayment', component: CreditCardPaymentComponent},
    {path: 'creditCardPayment/list', component: CreditCardPaymentListComponent},
    {path: 'creditCard', component: CreditCardComponent},
    {path: 'creditCard/list', component: CreditCardListComponent},
    {path: '**', component: ErrorComponent}
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders<any> = RouterModule.forRoot(appRoutes);