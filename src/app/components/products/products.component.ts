import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { Product } from '../../shared/interfaces';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {takeUntil} from 'rxjs/operators';
import {Subject, concat} from 'rxjs';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy {

  productsList:Product[];
  message:string ='';
  isMessage:boolean = false;
  isSuccess:boolean;
  lastProductDeleted:string ='';
 
  totalRecords: number;

  displayNameMap = new Map([
    [Breakpoints.XSmall, 'XSmall'],
    [Breakpoints.Small, 'Small'],
    [Breakpoints.Medium, 'Medium'],
    [Breakpoints.Large, 'Large'],
    [Breakpoints.XLarge, 'XLarge'],
  ]);

  destroyed = new Subject<void>();
  currentScreenSize: string;
  screenIsBig:boolean = true;
  screenIsSmall:boolean = false;


  constructor(private ps: ProductsService, breakpointObserver: BreakpointObserver, private router:Router){ 
    breakpointObserver.observe([
      Breakpoints.XSmall,
      Breakpoints.Small,
      Breakpoints.Medium,
      Breakpoints.Large,
      Breakpoints.XLarge,
    ]).pipe(takeUntil(this.destroyed)).subscribe(result => {
        for (const query of Object.keys(result.breakpoints)) {
          if (result.breakpoints[query]) {
            this.currentScreenSize = this.displayNameMap.get(query) ?? 'Unknown';
            if(this.currentScreenSize === "XLarge" || this.currentScreenSize === "Large" || this.currentScreenSize === "Medium") {
              this.screenIsBig = true;
            }
            else if(this.currentScreenSize === "Small" || this.currentScreenSize === "XSmall" ) {
              this.screenIsBig = false;
            }
            this.screenIsSmall = !this.screenIsBig;
          }
        }
    });
   }

  ngOnInit(): void {
    console.log("environment: ", environment);
    this.getProductsList();
    console.log("screen size: ", this.currentScreenSize);
  }

  ngOnDestroy() {
    this.destroyed.next();
    this.destroyed.complete();
  }

  edit($event) {
    this.router.navigate(['/edit/'+$event]);
  }

  delete($event) {
    this.ps.deleteProduct($event.id).pipe(takeUntil(this.destroyed)).subscribe(
      result => {
        console.log("delete result: ", result);
        if(result == null) {
          this.message = "Produit supprimé avec succès";
          this.isSuccess= true;
          localStorage.setItem("lastProductDeleted", $event.name);
          this.getProductsList();
        }
        else {
          this.message = "Problème rencontré lors de la suppression du produit";
          this.isSuccess = false;
        }
        this.isMessage = true;
      }
    )
  }

  getProductsList() {
      this.ps.getProducts().subscribe(
        data => {
          this.totalRecords = data.total;
          console.log("total Records: ", this.totalRecords);
          this.ps.getProducts(this.totalRecords).pipe(takeUntil(this.destroyed)).subscribe(
            fulldata => {
              this.productsList = fulldata.hits;
            });
        });
      /* TROUVER MEILLEUR SOLUTION  */
  }


 

}
