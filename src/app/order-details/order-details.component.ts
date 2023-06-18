
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../_services/product.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {

  displayedColumns = ["Id", "Product Name", "Name", "Address", "Contact Number", "Status", "Action"];
  dataSource = [];

  status: string = 'Tất cả';

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.getAllOrderDetailsForAdmin(this.status);
  }

  getAllOrderDetailsForAdmin(statusParameter: string) {
    this.productService.getAllOrderDetailsForAdmin(statusParameter).subscribe(
      (resp) => {
        console.log(resp);
        this.dataSource = resp;
      }, (err) => {
        console.log(err);
      }
    );
  }

  markAsDelivered(orderId) {
    console.log(orderId);
    this.productService.markAsDelivered(orderId).subscribe(
      (resp) => {
        this.getAllOrderDetailsForAdmin(this.status);
        console.log(resp);
      }, (err) => {
        console.log(err);
      }
    );
  }
}
