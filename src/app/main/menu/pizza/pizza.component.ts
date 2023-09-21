import { Component, Input, OnInit } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { OrderItem } from 'src/models/orderItem';
import { PizzaService } from 'src/services/pizza.service';
import { CustomizePizzaComponent } from '../../customize-pizza/customize-pizza.component';

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

  constructor(
    private pizzaService: PizzaService,
    private dialogService: DialogService
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
    this.pizzaService.cartUpdated.subscribe((orderItems) => {
      const cartItem = orderItems.find(
        (i) => i.itemId === this.pizza.id && i.size === this.selectedSize.size
      );
      if (!cartItem) this.selectedQuantity = 0;
    });
  }

  addToCart() {
    this.selectedQuantity++;
    const selectedPizza: OrderItem = {
      name: this.pizza.name,
      itemId: this.pizza.id,
      thumbnailPath: this.pizza.thumbnailPath,
      size: this.selectedSize.size,
      quantity: this.selectedQuantity,
      netPrice: this.selectedSize.price,
      ingredients: [],
    };
    this.pizzaService.orderItems.push(selectedPizza);
    this.pizzaService.orderItems = [...this.pizzaService.orderItems];
  }

  updateCartItems() {
    if (this.selectedQuantity === 0) {
      const index = this.pizzaService.orderItems.findIndex(
        (i) => i.itemId === this.pizza.id
      );
      this.pizzaService.orderItems.splice(index, 1);
      this.pizzaService.orderItems = [...this.pizzaService.orderItems];
      return;
    }
    const cartItem = this.pizzaService.orderItems.find(
      (i) => i.itemId === this.pizza.id
    );
    if (cartItem) {
      cartItem.quantity = this.selectedQuantity;
      cartItem.netPrice = this.selectedSize.price * this.selectedQuantity;
      this.pizzaService.orderItems = [...this.pizzaService.orderItems];
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
