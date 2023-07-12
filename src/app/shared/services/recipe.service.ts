import { Injectable } from '@angular/core';
import { Recipe } from '../models/recipes.model';
import { Ingredient } from '../models/ingredient.model';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private _recipeList: Recipe[] = [
    new Recipe('Ratatouille', "Indulge in this classic Ratatouille, a vibrant and flavorful dish that'll transport you straight to the heart of France. ", "https://www.howtocook.recipes/wp-content/uploads/2021/05/Ratatouille-recipe.jpg", [new Ingredient("Eggplants", 2), new Ingredient("Roma Tomates", 6), new Ingredient("Yellow Squashes",2)]),
    new Recipe('A test recipe 2', "This is a simple recipe 2", "https://www.simplyrecipes.com/thmb/4_wTLA6Q_2o7dgNO-ze0w7oeX_w=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/Simply-Recipes-Homemade-Pizza-Dough-Lead-Shot-1b-ea13798d224048b3a28afb0936c9b645.jpg", [new Ingredient("Test Ingredient3", 15)])
  ];

  get recipes(): Recipe[] {
    return [...this._recipeList];
  }

  public getRecipeById(id: string): Recipe {
    const recipes = this._recipeList.filter(recipe => {
      return recipe.id == id
    })
    return recipes[0];
  }


  constructor() { }
}
