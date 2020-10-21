import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { BaseComponent } from '../../../lib/base-component';
import 'rxjs/add/operator/takeUntil';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})

export class ProductComponent extends BaseComponent implements OnInit {
  public products: any;
  public totalRecords:any;
  public pageSize = 3;
  public page = 1;
  constructor(injector: Injector) {
    super(injector);
  }

  ngOnInit(): void {
    this.search();
  }

  search() {
    this.page = 1;
    this.pageSize = 5;
    console.log("run in here !");
    this._api.post('/api/item/search', {page: this.page, pageSize: this.pageSize, item_group_id: '1b2f3b32-d006-4ed8-ab0c-099fd86aa6dd'}).takeUntil(this.unsubscribe).subscribe(res => {
      this.products = res.data;
      this.totalRecords =  res.totalItems;
      this.pageSize = res.pageSize;
      });
  }

  loadPage(page) {
    console.log("run in here !");
    this._api.post('/api/item/search', {page: page, pageSize: this.pageSize}).takeUntil(this.unsubscribe).subscribe(res => {
      this.products = res.data;
      this.totalRecords =  res.totalItems;
      this.pageSize = res.pageSize;
      });
  }

}
