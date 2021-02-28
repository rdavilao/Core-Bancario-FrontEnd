import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { routing, appRoutingProviders } from './app.routing';
import { AppComponent } from './app.component';
import { ClientComponent } from './components/client/client.component';
import { AccountComponent } from './components/account/account.component';
import { TransactionComponent } from './components/transaction/transaction.component';
import { ErrorComponent } from './components/error/error.component';
import { NavigationComponent } from './shared/navigation/navigation.component';
import {SharedStyleModule } from './shared/shared-style/shared-style.module';


@NgModule({
  declarations: [
    AppComponent,
    ClientComponent,
    AccountComponent,
    TransactionComponent,
    NavigationComponent,
    ErrorComponent
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
