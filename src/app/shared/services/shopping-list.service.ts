import {  Injectable } from '@angular/core';
import { Ingredient } from '../models/ingredient.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {
  private _ingredients: Ingredient[] = [];
  private _ingredientSelectedIndex:number;

  public ingredientsUpdated = new Subject<Ingredient[]>();
  public ingredientSelected = new Subject<Ingredient>();

  get ingredients() {
    return [...this._ingredients];
  }
  constructor() { }

  public addIngredient(ingredient:Ingredient):void {
    this._ingredients.push(ingredient);
    this.ingredientsUpdated.next( [...this._ingredients] );
  }
  public addIngredients(ingredients:Ingredient[]):void { 
    //method created to avoid sending several messages when several recipes are added.
    this._ingredients.push(...ingredients);
    this.ingredientsUpdated.next( [...this._ingredients] );
  }
  public selectIngredient(ingredientIndex:number):void {
    this._ingredientSelectedIndex=ingredientIndex;
    this.ingredientSelected.next(this._ingredients[ingredientIndex]);
  }
  public updateIngredient(ingredientUpdated:Ingredient):void {
    this._ingredients[this._ingredientSelectedIndex] = ingredientUpdated;
    this._ingredientSelectedIndex = null;
    this.ingredientsUpdated.next( [...this._ingredients] );
  }
  public deleteIngredient(ingredientIndex:number):void {
    this._ingredients.splice(ingredientIndex,1)
    this.ingredientsUpdated.next( [...this._ingredients] );
  }
}
