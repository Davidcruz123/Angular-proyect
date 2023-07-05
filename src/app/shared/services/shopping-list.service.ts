import { EventEmitter, Injectable } from '@angular/core';
import { Ingredient } from '../models/ingredient.model';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {
  private _ingredients: Ingredient[] = [
    // new Ingredient("Apples",10),
    // new Ingredient("Oranges",80)
  ];
  public ingredientsUpdated = new EventEmitter<Ingredient[]>();

  get ingredients() {
    return [...this._ingredients];
  }
  constructor() { }

  public addIngredient(ingredient:Ingredient):void {
    this._ingredients.push(ingredient);
    this.ingredientsUpdated.emit( [...this._ingredients] );
  }
  public addIngredients(ingredients:Ingredient[]):void { 
    //method created to avoid sending several messages when several recipes are added.
    this._ingredients.push(...ingredients);
    this.ingredientsUpdated.emit( [...this._ingredients] );
  }
}
