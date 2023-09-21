import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PizzaCounterComponent } from './pizza-counter.component';

describe('PizzaCounterComponent', () => {
  let component: PizzaCounterComponent;
  let fixture: ComponentFixture<PizzaCounterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PizzaCounterComponent]
    });
    fixture = TestBed.createComponent(PizzaCounterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
