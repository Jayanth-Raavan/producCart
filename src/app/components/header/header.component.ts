import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/service/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public totalItem:number = 0;
  public searchTerm !: string;
  constructor(private cart: CartService) { }

  ngOnInit(): void {
    this.cart.GetProducts().subscribe(result=>{
      this.totalItem = result.length;
    })
  }
  search(event:any){
    this.searchTerm = (event.target as HTMLInputElement).value;
    console.log(this.searchTerm);
    let searchItem = this.cart.search.next(this.searchTerm);
    console.warn(searchItem)
  }

}
