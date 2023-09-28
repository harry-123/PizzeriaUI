import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { MessageService } from 'primeng/api';
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
export class CartComponent implements OnChanges {
  header = 'YOUR CART IS EMPTY';
  subheader = 'Please add some items from the menu.';
  @Input() cartItems: OrderItem[] = [];
  total = 0;

  constructor(
    public pizzaService: PizzaService,
    private orderService: OrderService,
    private messageService: MessageService
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
      this.total += x.netPrice;
    });
  }

  deleteCartItem(item: OrderItem) {
    const index = this.cartItems.findIndex(
      (x) => x.id === item.id
    );
    this.cartItems.splice(index, 1);
    this.cartItems = [...this.cartItems];
    this.pizzaService.orderItems = this.cartItems;
    this.pizzaService.cartUpdated.emit(this.cartItems);
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
        this.cartItems = [];
        this.pizzaService.orderItems = this.cartItems;
        this.pizzaService.cartUpdated.emit(this.cartItems);
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
