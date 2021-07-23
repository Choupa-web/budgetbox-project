import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../services/products.service';
import { Product } from '../../shared/interfaces';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit, OnDestroy {
  productToEdit:Product;
  updateProductForm:FormGroup;
  payload:Product;
  isValueChanged:boolean = false;
  destroyed = new Subject<void>();
  message:string ='';
  isMessage:boolean = false;
  isSuccess:boolean;
  isBusy:boolean;

  constructor(private router: Router, private route: ActivatedRoute, private ps: ProductsService, private fb:FormBuilder) { }

  ngOnInit(): void {
    this.isBusy = true;
     this.getProductInfo(this.route.snapshot.params['id']);  
    
  }

  ngOnDestroy() {
    this.destroyed.next();
    this.destroyed.complete();
  }

  getProductInfo(id:number) {
    this.ps.getProductInfo(id).pipe(takeUntil(this.destroyed)).subscribe(
      data => {
        if(data.id != -1) {
          this.productToEdit = data;
          this.updateProductForm = this.fb.group({
            productName: [this.productToEdit.name],
            productScientificName: [this.productToEdit.scientificName],
          });
          this.updateProductForm.valueChanges.subscribe(
            value => {
              if(value.productName === this.productToEdit.name && value.productScientificName === this.productToEdit.scientificName){
                this.isValueChanged = false;
              }
              else if(value.productName != this.productToEdit.name || value.productScientificName != this.productToEdit.scientificName) { this.isValueChanged = true;}
            }
          ); 
        }
        else {
          this.message = "Récuperation des informations du produit: " + data.error.message;
          this.isSuccess = false;
          this.isMessage = true;
        }
        this.isBusy = false;
      }
    );
  }

  onSubmitForm() {
    console.log("submitted: ", this.updateProductForm.value['productName']);
    this.payload = {
      id:this.productToEdit.id,
      name: this.updateProductForm.value['productName'],
      scientificName: this.updateProductForm.value['productScientificName'],
      groupId:this.productToEdit.groupId,
      subGroupId:this.productToEdit.subGroupId,
    };
    
    this.ps.updateProduct(this.payload).pipe(takeUntil(this.destroyed)).subscribe(
      data => {
        console.log("update result: ", data);
        if(data.id != -1) {
          this.router.navigate(['/']);
        }
        else {
          this.message = "Mise a jour du produit: " + data.error.message;
          this.isSuccess = false;
          this.isMessage = true;
        }
      }
    );
  }

  backButton(){
    this.router.navigate(['/']);
  }



}
