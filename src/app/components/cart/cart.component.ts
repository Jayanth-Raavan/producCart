import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/service/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  public product:any = [];
  public grandTotal: number = 0;
  constructor(private cart : CartService) { }

  ngOnInit(): void {
    this.cart.GetProducts().subscribe(result=>{
      console.log(result)
      this.product=result;
      this.grandTotal = this.cart.GetTotalPrice();
    })
  }
  removeItem(item:any){
    if(confirm('Are you sure want remove this item from Cart?'))
    this.cart.RemoveCartItem(item);
    alert('Item was deleted!')
  }
  emptyCart(){
    this.cart.RemoveAllCart();
  }
}
