import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Ingredient } from 'src/models/ingredient';
import { OrderItem } from 'src/models/orderItem';
import { PizzaService } from 'src/services/pizza.service';

@Component({
  selector: 'app-customize-pizza',
  templateUrl: './customize-pizza.component.html',
  styleUrls: ['./customize-pizza.component.scss'],
})
export class CustomizePizzaComponent implements OnInit {
  pizzaIngredients: any[] = [];
  sauces: any[] = [];
  cheeses: any[] = [];
  toppings: any[] = [];
  pizzaSize: any;
  steps: MenuItem[] = [
    { label: 'Sauce' },
    { label: 'Cheese' },
    { label: 'Toppings' },
  ];
  activeIndex = 0;
  selectedSauce: any;
  selectedCheese: any;
  selectedPizza: any;
  basePrice: number;
  totalPrice: number;
  selectedToppings = [];

  constructor(
    private pizzaService: PizzaService,
    private ref: DynamicDialogRef,
    public config: DynamicDialogConfig
  ) {
    this.pizzaSize = config.data.size;
    this.selectedPizza = config.data.pizza;
    this.basePrice = this.pizzaSize.price;
    this.totalPrice = this.basePrice;
  }

  ngOnInit(): void {
    this.getPizzaIngredients();
  }

  getPizzaIngredients() {
    this.pizzaService.getPizzaIngredigents().subscribe((data) => {
      this.pizzaIngredients = data;
      this.pizzaIngredients.forEach((ingredient) => {
        ingredient.price = ingredient.prices.find(
          (i: any) => i.size === this.pizzaSize.size
        ).price;
      });
      this.sauces = this.pizzaIngredients.filter((x) => x.type === 'Sauce');
      this.cheeses = this.pizzaIngredients.filter((x) => x.type === 'Cheese');
      this.toppings = this.pizzaIngredients.filter((x) => x.type === 'Topping');
      this.selectedSauce = this.sauces[0];
      this.selectedCheese = this.cheeses[0];
    });
  }

  ingredientsUpdateHandler() {
    this.totalPrice =
      this.basePrice + this.selectedSauce.price + this.selectedCheese.price;
    this.selectedToppings.forEach((t: any) => {
      this.totalPrice += t.price;
    });
  }

  addToCart() {
    const selectedPizza: OrderItem = {
      name: this.selectedPizza.name,
      itemId: this.selectedPizza.id,
      thumbnailPath: this.selectedPizza.thumbnailPath,
      size: this.pizzaSize.size,
      quantity: 1,
      netPrice: this.totalPrice,
      ingredients: this.getIngredigentList(),
    };
    this.pizzaService.orderItems.push(selectedPizza);
    this.pizzaService.orderItems = [...this.pizzaService.orderItems];
    this.ref.close();
  }

  getIngredigentList(): Ingredient[] {
    const list: Ingredient[] = [];
    list.push({
      name: this.selectedSauce.name,
      type: 'Sauce',
      ingredientId: this.selectedSauce.id,
    });
    list.push({
      name: this.selectedCheese.name,
      type: 'Cheese',
      ingredientId: this.selectedCheese.id,
    });
    this.selectedToppings.forEach((t: any) => {
      list.push({
        name: t.name,
        type: 'Topping',
        ingredientId: t.id,
      });
    });
    return list;
  }
}
