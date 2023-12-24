import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { MessageService } from 'primeng/api';
import { AppState } from 'src/app/store/app.state';
import { clearCart, removeFromCart } from 'src/app/store/cart.actions';
import { selectOrderItems } from 'src/app/store/cart.selectors';
import { Order } from 'src/models/order';
import { OrderItem } from 'src/models/orderItem';
import { OrderService } from 'src/services/order.service';
import { PizzaService } from 'src/services/pizza.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
  providers: [MessageService],
})
export class CartComponent implements OnInit {
  header = 'YOUR CART IS EMPTY';
  subheader = 'Please add some items from the menu.';
  cartItems: OrderItem[] = [];
  total = 0;

  constructor(
    public pizzaService: PizzaService,
    private orderService: OrderService,
    private messageService: MessageService,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.store.select(selectOrderItems).subscribe((result) => {
      this.cartItems = result;
      this.updatePricingLabels();
    });
  }

  updatePricingLabels(): void {
    if (this.cartItems.length === 0) {
      this.header = 'YOUR CART IS EMPTY';
      this.subheader = 'Please add some items from the menu.';
    } else {
      this.header = 'Your Cart';
      this.subheader = '';
    }
    this.total = 0;
    this.cartItems.forEach((x) => {
      this.total += x.netPrice;
    });
  }

  deleteCartItem(item: OrderItem) {
    this.store.dispatch(removeFromCart(item));
  }

  placeOrder() {
    const order: Order = {
      deliveryAddress: 'B 410, Aditya Windsor, Whitefields, Kondapur, 50084',
      orderValue: this.total,
      orderItems: this.cartItems,
    };
    this.orderService.placeOrder(order).subscribe(
      (result) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Order Placed Successfully',
        });
        this.store.dispatch(clearCart());
      },
      (error) => {
        this.messageService.add({
          severity: 'failure',
          summary: 'Failure',
          detail: 'Failed to place order',
        });
      }
    );
  }
}
