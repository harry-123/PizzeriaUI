import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { HeaderComponent } from './layout/header/header.component';
import { LandingPageComponent } from './layout/landing-page/landing-page.component';
import { MenuComponent } from './main/menu/menu.component';
import { CartComponent } from './main/cart/cart.component';
import { HttpClientModule } from '@angular/common/http';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { PizzaComponent } from './main/menu/pizza/pizza.component';
import { PizzaCounterComponent } from './main/menu/pizza/pizza-counter/pizza-counter.component';
import { CustomizePizzaComponent } from './main/customize-pizza/customize-pizza.component';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { RadioButtonModule } from 'primeng/radiobutton';
import { CheckboxModule } from 'primeng/checkbox';
import { StepsModule } from 'primeng/steps';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    HeaderComponent,
    LandingPageComponent,
    MenuComponent,
    CartComponent,
    PizzaComponent,
    PizzaCounterComponent,
    CustomizePizzaComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    ButtonModule,
    CardModule,
    DropdownModule,
    FormsModule,
    DynamicDialogModule,
    RadioButtonModule,
    CheckboxModule,
    StepsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
