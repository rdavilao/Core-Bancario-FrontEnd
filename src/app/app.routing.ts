import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClientComponent } from './components/client/client.component';
import { AccountComponent } from './components/account/account.component';
import { TransactionComponent } from './components/transaction/transaction.component';
import { ErrorComponent } from './components/error/error.component';
import { NavigationComponent } from './shared/navigation/navigation.component';

const appRoutes: Routes = [
    {path: '', component: NavigationComponent},
    {path: 'client', component: ClientComponent},
    {path: 'account', component: AccountComponent},
    {path: 'transaction', component: TransactionComponent},
    {path: '**', component: ErrorComponent}
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders<any> = RouterModule.forRoot(appRoutes);