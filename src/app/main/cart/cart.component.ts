import {
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { OrderItem } from 'src/models/orderItem';
import { PizzaService } from 'src/services/pizza.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnChanges {
  header = 'YOUR CART IS EMPTY';
  subheader = 'Please add some items from the menu.';
  @Input() cartItems: OrderItem[] = [];
  total = 0;

  constructor(
    public pizzaService: PizzaService,
    private ref: ChangeDetectorRef
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (this.cartItems.length === 0) {
      this.header = 'YOUR CART IS EMPTY';
      this.subheader = 'Please add some items from the menu.';
    } else {
      this.header = 'Your Cart';
      this.subheader = '';
    }
    this.total = 0;
    this.cartItems.forEach((x) => {
      this.total += x.itemValue;
    });
  }

  deleteCartItem(item: OrderItem) {
    const index = this.cartItems.findIndex(
      (x) => x.id === item.id && x.size === item.size
    );
    this.cartItems.splice(index, 1);
    this.cartItems = [...this.cartItems];
    this.pizzaService.orderItems = this.cartItems;
    this.pizzaService.cartUpdated.emit(this.cartItems);
  }
}
