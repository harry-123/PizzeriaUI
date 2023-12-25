import { Component, Input, OnInit } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { OrderItem } from 'src/models/orderItem';
import { CustomizePizzaComponent } from '../../customize-pizza/customize-pizza.component';
import { Store } from '@ngrx/store';
import {
  addToCart,
  incrementUniqueItemId,
  removeFromCart,
  updateCartItem,
} from 'src/app/store/cart.actions';
import {
  selectOrderItems,
  selectUniqueItemId,
} from 'src/app/store/cart.selectors';
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
  uniqueItemId: number = 0;

  constructor(
    private dialogService: DialogService,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.setDefaultSizeToMedimum();
    this.listenToCartUpdates();
    this.getUniqueItemId();
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

  getUniqueItemId() {
    this.store.select(selectUniqueItemId).subscribe((itemId) => {
      this.uniqueItemId = itemId;
    });
  }

  addToCart() {
    this.selectedQuantity++;
    const selectedPizza: OrderItem = {
      id: this.uniqueItemId,
      name: this.pizza.name,
      itemId: this.pizza.id,
      thumbnailPath: this.pizza.thumbnailPath,
      size: this.selectedSize.size,
      quantity: this.selectedQuantity,
      netPrice: this.selectedSize.price,
      ingredients: [],
    };
    this.store.dispatch(addToCart(selectedPizza));
    this.store.dispatch(incrementUniqueItemId());
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
