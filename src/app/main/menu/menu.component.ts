import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PizzaService } from 'src/services/pizza.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  pizzas: Observable<any[]> | undefined;
  selectedSize = { size: 'Small', price: 100 };
  constructor(private pizzaService: PizzaService) {}

  ngOnInit(): void {
    this.pizzas = this.pizzaService.getPizzas();
  }
}
