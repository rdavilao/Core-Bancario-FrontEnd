import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClientComponent } from './components/client/client.component';
import { AccountComponent } from './components/account/account.component';
import { TransactionComponent } from './components/transactions/transaction/transaction.component';
import { TransactionListComponent } from './components/transactions/transaction-list/transaction-list.component';
import { CreditCardComponent } from './components/creditCard/credit-card/credit-card.component';
import { CreditCardListComponent } from './components/creditCard/credit-card-list/credit-card-list.component';
import { ErrorComponent } from './components/error/error.component';
import { NavigationComponent } from './shared/navigation/navigation.component';
import { listLazyRoutes } from '@angular/compiler/src/aot/lazy_routes';

const appRoutes: Routes = [
    {path: 'client', component: ClientComponent},
    {path: 'account', component: AccountComponent},
    {path: 'transaction', component: TransactionComponent},
    {path: 'transaction/list', component: TransactionListComponent},
    {path: 'creditCard', component: CreditCardComponent},
    {path: 'creditCard/list', component: CreditCardListComponent},
    {path: '**', component: ErrorComponent}
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders<any> = RouterModule.forRoot(appRoutes);