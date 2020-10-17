import { BaseComponent } from './../../lib/base-component';
import { Component, Injector, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent extends BaseComponent implements OnInit {
  items:any;
  total:any;
  public hoadonForm: FormGroup;
  constructor(injector: Injector,public  router: Router) { 
    super(injector);
  }

  onSubmit(value: any) {
    let hoadon = {ho_ten: value.ho_ten, dia_chi:value.dia_chi, sodt:value.sodt, email:value.email, listjson_chitiet:this.items};
    this._api.post('/api/hoadon/create-hoa-don', hoadon).takeUntil(this.unsubscribe).subscribe(res => {
      alert('Tạo thành công');
      this.router.navigate(['']);
      this.total=0;
      this._cart.clearCart();
       }, err => { });      
 
  }

  ngOnInit(): void {
    this.hoadonForm = new FormGroup({
      ho_ten: new FormControl('', Validators.required),
      dia_chi: new FormControl('')       
    });

    this._cart.items.subscribe((res) => {
      this.items = res;
      this.total = 0;
      for(let x of this.items){ 
        x.so_luong = +x.quantity;
        x.money = x.quantity * x.item_price;
        this.total += x.quantity * x.item_price;
      } 
    });

  }

}
