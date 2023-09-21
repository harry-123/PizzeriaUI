import { Component } from '@angular/core';
import { PizzaService } from 'src/services/pizza.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent {
  constructor(public pizzaService: PizzaService) {}
}
