import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pizza-counter',
  templateUrl: './pizza-counter.component.html',
  styleUrls: ['./pizza-counter.component.scss'],
})
export class PizzaCounterComponent {
  @Input() counter = 0;
  @Output() counterChange = new EventEmitter<number>();

  incrementCounter() {
    this.counterChange.emit(++this.counter);
  }

  decrementCounter() {
    this.counterChange.emit(--this.counter);
  }
}
