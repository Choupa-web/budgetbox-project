import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ProductsComponent } from './components/products/products.component';
import { ProductsGridComponent } from './components/products-grid/products-grid.component';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatListModule} from '@angular/material/list';
import { ProductsListComponent } from './components/products-list/products-list.component';
import { HeaderComponent } from './shared/header/header.component';
import {LayoutModule} from '@angular/cdk/layout';
import { ProductEditComponent } from './components/product-edit/product-edit.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { ProductAddComponent } from './components/product-add/product-add.component';
import { AlertsComponent } from './shared/alerts/alerts.component';
import { Error404Component } from './components/error404/error404.component';



@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent,
    ProductsGridComponent,
    ProductsListComponent,
    HeaderComponent,
    ProductEditComponent,
    ProductAddComponent,
    AlertsComponent,
    Error404Component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatTableModule,
    MatPaginatorModule,
    MatListModule,
    LayoutModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
