import { Component } from '@angular/core';
import { Ingredient } from 'src/app/component/shared/ingredient.model';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
})
export class ShoppingListComponent {
  public ingredients: Ingredient[] = [
    new Ingredient("Apples",10),
    new Ingredient("Oranges",80)
  ];
  public addElementToShoppingList(ingredient:Ingredient):void {
    this.ingredients.push(ingredient);
  }
}
