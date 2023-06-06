import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
import { CartService } from 'src/app/service/cart.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  public productsList: any;
  isLoading: boolean = true;
  public filterCategory : any
  searchKey:string ="";
  constructor(private api: ApiService, private cart : CartService) { }

  ngOnInit(): void {
    this.api.GetProduct()
    .subscribe(res=>{
      this.isLoading = false;
      this.productsList = res;
      this.filterCategory = res;
      this.productsList.forEach((a:any) => {
        if(a.category ==="women's clothing" || a.category ==="men's clothing"){
          a.category ="fashion"
        }
        Object.assign(a,{quantity:1,total:a.price});
      });
      console.log(this.productsList)
    });

    this.cart.search.subscribe((val:any)=>{
      this.searchKey = val;
    })
  }
  addToCart(item: any){
    this.cart.AddToCart(item);
  }
  filter(category:string){
    this.filterCategory = this.productsList
    .filter((a:any)=>{
      if(a.category == category || category==''){
        return a;
      }
    })
  }
}
