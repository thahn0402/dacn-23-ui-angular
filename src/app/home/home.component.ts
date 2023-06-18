import { Component, OnInit } from '@angular/core';
import { ProductService } from '../_services/product.service';
import { map } from 'rxjs/operators';
import { Product } from '../_model/product.model';
import { HttpErrorResponse } from '@angular/common/http';
import { ImageProcessingService } from '../image-processing.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  pageNumber: number = 0;

  productDetails = [];

  showLoadButton = false;

  constructor(private productService: ProductService,
    private imageProcessingService: ImageProcessingService,
    private router: Router) { }

  ngOnInit(): void {
    this.getAllProducts();
  }

  public getAllProducts(searchKey: string ="") {
    this.productService.getAllProducts(this.pageNumber, searchKey)
      .pipe(
        map((x: Product[], i) => x.map((product: Product) => this.imageProcessingService.createImages(product)))
      )
      .subscribe(
        (response: Product[]) => {
          console.log(response);
          if (response.length == 12) {
            this.showLoadButton = true;
          } else {
            this.showLoadButton = false;
          }
          response.forEach(p => this.productDetails.push(p));
        }, (error: HttpErrorResponse) => {
          console.log(error);
        }
      );
  }

  loadMoreProduct() {
    this.pageNumber = this.pageNumber + 1;
    this.getAllProducts();
  }

  showProductDetails(productId) {
    this.router.navigate(['/productViewDetails', { productId: productId }])
  }

  searchByKeyWord(searchkeyword) {
    console.log(searchkeyword);
    this.pageNumber = 0;
    this.productDetails = [];
    this.getAllProducts(searchkeyword);
  }
}
