import { Component, Input, OnInit } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { OrderItem } from 'src/models/orderItem';
import { PizzaService } from 'src/services/pizza.service';
import { CustomizePizzaComponent } from '../../customize-pizza/customize-pizza.component';
import { OrderService } from 'src/services/order.service';
import { Store } from '@ngrx/store';
import {
  addToCart,
  removeFromCart,
  updateCartItem,
} from 'src/app/store/cart.actions';
import { selectOrderItems } from 'src/app/store/cart.selectors';
import { AppState } from 'src/app/store/app.state';

@Component({
  selector: 'app-pizza',
  templateUrl: './pizza.component.html',
  styleUrls: ['./pizza.component.scss'],
  providers: [DialogService],
})
export class PizzaComponent implements OnInit {
  @Input() pizza: any;
  selectedSize: any;
  selectedQuantity = 0;
  ref: DynamicDialogRef | undefined;
  cartItems: OrderItem[] = [];

  constructor(
    private pizzaService: PizzaService,
    private dialogService: DialogService,
    private orderService: OrderService,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.setDefaultSizeToMedimum();
    this.listenToCartUpdates();
  }

  setDefaultSizeToMedimum() {
    this.selectedSize = this.pizza?.prices.find(
      (x: any) => x.size === 'Medium'
    );
  }

  listenToCartUpdates() {
    this.store.select(selectOrderItems).subscribe((orderItems) => {
      this.cartItems = orderItems;
      const cartItem = orderItems.find(
        (i) => i.itemId === this.pizza.id && i.size === this.selectedSize.size
      );
      if (!cartItem) this.selectedQuantity = 0;
    });
  }

  addToCart() {
    this.selectedQuantity++;
    const selectedPizza: OrderItem = {
      id: this.orderService.uniqueItemId,
      name: this.pizza.name,
      itemId: this.pizza.id,
      thumbnailPath: this.pizza.thumbnailPath,
      size: this.selectedSize.size,
      quantity: this.selectedQuantity,
      netPrice: this.selectedSize.price,
      ingredients: [],
    };
    this.orderService.uniqueItemId++;
    this.store.dispatch(addToCart(selectedPizza));
  }

  updateCartItems() {
    if (this.selectedQuantity === 0) {
      const item = this.cartItems.find(
        (i) =>
          i.itemId === this.pizza.id &&
          i.size === this.selectedSize.size &&
          i.ingredients.length === 0
      );
      if (item) this.store.dispatch(removeFromCart(item));
      return;
    }
    const cartItem = this.cartItems.find(
      (i) =>
        i.itemId === this.pizza.id &&
        i.size === this.selectedSize.size &&
        i.ingredients.length === 0
    );
    if (cartItem) {
      const updatedItem = {
        ...cartItem,
        quantity: this.selectedQuantity,
        netPrice: this.selectedSize.price * this.selectedQuantity,
      };
      this.store.dispatch(updateCartItem(updatedItem));
    }
  }

  sizeChangeHandler() {
    this.selectedQuantity = 0;
  }

  openCustomizeDialog() {
    this.ref = this.dialogService.open(CustomizePizzaComponent, {
      header: 'Customize Your Pizza',
      maximizable: false,
      width: '30%',
      height: '75%',
      data: { size: this.selectedSize, pizza: this.pizza },
    });
  }
}
