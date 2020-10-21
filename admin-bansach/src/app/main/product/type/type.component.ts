import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { BaseComponent } from '../../../lib/base-component';
import 'rxjs/add/operator/takeUntil';

@Component({
  selector: 'app-type',
  templateUrl: './type.component.html',
  styleUrls: ['./type.component.css']
})

export class TypeComponent  extends BaseComponent implements OnInit {

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
    this._api.get('/api/item-group/get-menu/GetAllMenu').takeUntil(this.unsubscribe).subscribe(res => {
      this.products = res.data;
      this.totalRecords =  res.totalItems;
      this.pageSize = res.pageSize;
      });
  }

  loadPage(page) {
    console.log("run in here !");
    this._api.post('/api/get-menu', {page: page, pageSize: this.pageSize}).takeUntil(this.unsubscribe).subscribe(res => {
      this.products = res.data;
      this.totalRecords =  res.totalItems;
      this.pageSize = res.pageSize;
      });
  }

}
