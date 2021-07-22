import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ProductsService } from '../../services/products.service';
import { Router } from '@angular/router';

interface newProduct  {
  name:string;
  scientificName:string;
  groupId:string;
  subGroupId:string;
}

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit {

  addProductForm: FormGroup;
  isValues: boolean = false;
  payload:newProduct;
  message:string ='';
  isMessage:boolean = false;
  isSuccess:boolean;

  constructor(private fb:FormBuilder, private ps:ProductsService, private router:Router) { }

  ngOnInit(): void {
    this.addProductForm = this.fb.group({
      productName: [''],
      productScientificName:[''],
    });

    this.addProductForm.valueChanges.subscribe(
      data => {
        if(data.productName != '' && data.productScientificName !='') {
          this.isValues = true;
        }
        else if(data.productName == '' || data.productScientificName =='') { this.isValues = false;}
      });  
  }

  onSubmitAddForm(){
    // Recuperation des infos du formulaire
    this.payload = {
      name: this.addProductForm.value['productName'],
      scientificName: this.addProductForm.value['productScientificName'],
      groupId:"136",
      subGroupId:"137"
    };
    this.ps.addProduct(this.payload).subscribe(
      data => {
        if(data) {
          this.message = "Produit ajouté avec succes";
          this.isSuccess = true;
        }
        else {
          this.message = "Erreur de lors de l'ajout du produit";
          this.isSuccess = false;
        }
        this.isMessage = true;
        this.addProductForm.reset();
      }
    );
  }

  backButton(){
    this.router.navigate(['/']);
  }

}
