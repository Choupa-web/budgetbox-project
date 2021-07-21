import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { ProductEditComponent } from './components/product-edit/product-edit.component';
import { ProductsComponent } from './components/products/products.component';

const routes: Routes = [
  {path: 'edit/:id', component:ProductEditComponent},
  {path: '', component:ProductsComponent},
  {path: '**', component:ProductsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
