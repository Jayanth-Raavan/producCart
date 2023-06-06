import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  public cartItemList : any=[];
  public search = new BehaviorSubject<string>("");
  public productList = new BehaviorSubject<any>([]);
  constructor() { }

  GetProducts(){
   return this.productList.asObservable()
  }
  SetProducts(product:any){
    this.cartItemList.push(...product);
    this.productList.next(product)
  }
  AddToCart(product:any){
    this.cartItemList.push(product);
    this.productList.next(this.cartItemList);
    this.GetTotalPrice();
    // console.log(this.cartItemList)
  }
  GetTotalPrice(){
    let grandTotal = 0;
    this.cartItemList.map((a:any)=>{
      grandTotal += a.total;
      console.log(a.total)
    })
    return grandTotal;
  }
  RemoveCartItem(product:any){
    this.cartItemList.map((a:any, index:any)=>{
      if(product.id === a.id)
        this.cartItemList.splice(index, 1);
    })
    this.productList.next(this.cartItemList);
  }
  RemoveAllCart(){
    this.cartItemList = [];
    this.productList.next(this.cartItemList)
  }
}
