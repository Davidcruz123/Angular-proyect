import { Component, Input } from '@angular/core';
import { Recipe } from '../../../shared/models/recipes.model';
import { ShoppingListService } from 'src/app/shared/services/shopping-list.service';
import { Ingredient } from 'src/app/shared/models/ingredient.model';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
})
export class RecipeDetailComponent {
  @Input() recipeData:Recipe ;

  constructor(private shoppingListService:ShoppingListService){

  }

  public addIngredientsToShoppingList():void{
    this.shoppingListService.addIngredients( [...this.recipeData.ingredients])
  }
}
