import { Component, OnInit } from '@angular/core';
import { ProductService } from '../_services/product.service';
import { Product } from '../_model/product.model';
import { HttpErrorResponse } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { ShowProductImagesDialogComponent } from '../show-product-images-dialog/show-product-images-dialog.component';
import { ImageProcessingService } from '../image-processing.service';
import { map } from 'rxjs/operators';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-show-product-details',
  templateUrl: './show-product-details.component.html',
  styleUrls: ['./show-product-details.component.css']
})
export class ShowProductDetailsComponent implements OnInit {

  pageNumber: number = 0;
  showTable = false;
  showLoadMoreButton = false;
  productDetails: Product[] = [];
  displayedColumns: string[] = ['Id', 'name', 'description', 'actualPrice', 'discountedPrice', 'actions'];

  constructor(private productService: ProductService,
    public imagesDialog: MatDialog,
    private imageProcessingService: ImageProcessingService,
    private router: Router) { }

  ngOnInit(): void {
    this.getAllProducts();
  }

  public getAllProducts(searchKeyword: string = "") {
    this.showTable = false;
    this.productService.getAllProducts(this.pageNumber, searchKeyword)
      .pipe(
        map((x: Product[], i) => x.map((product: Product) => this.imageProcessingService.createImages(product)))
      )
      .subscribe(
        (response: Product[]) => {
          console.log(response);
          response.forEach(product => this.productDetails.push(product));
          this.showTable = true;
          if (response.length == 12) {
            this.showLoadMoreButton = true;
          } else {
            this.showLoadMoreButton = false;
          }

          //this.productDetails = response;
        }, (error: HttpErrorResponse) => {
          console.log(error);
        }
      );
  }

  deleteProduct(productId) {
    this.productService.deleteProduct(productId).subscribe(
      (resp) => {
        this.getAllProducts();
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
  }

  showImgaes(product: Product) {
    console.log(product)
    this.imagesDialog.open(ShowProductImagesDialogComponent, {
      data: {
        images: product.productImages
      },
      height: '500px',
      width: '800px'
    });
  }

  editProductDetails(productId) {
    this.router.navigate(['/addNewProduct', { productId: productId }]);
  }

  loadMoreProduct() {
    this.pageNumber = this.pageNumber + 1;
    this.getAllProducts();
  }

  searchByKeyWord(searchkeyword){
    console.log(searchkeyword);
    this.pageNumber = 0;
    this.productDetails = [];
    this.getAllProducts(searchkeyword);
  }
}