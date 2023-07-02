import { EventEmitter, Injectable } from '@angular/core';
import { Recipe } from '../models/recipes.model';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  public recipeSelected = new EventEmitter<Recipe>(); 
  private _recipeList:Recipe[]=[
    new Recipe('A test recipe', "This is a simple recipe","https://www.howtocook.recipes/wp-content/uploads/2021/05/Ratatouille-recipe.jpg"),
    new Recipe('A test recipe 2', "This is a simple recipe 2","https://www.simplyrecipes.com/thmb/4_wTLA6Q_2o7dgNO-ze0w7oeX_w=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/Simply-Recipes-Homemade-Pizza-Dough-Lead-Shot-1b-ea13798d224048b3a28afb0936c9b645.jpg")
  ];

  get recipes():Recipe[] {
    return [...this._recipeList];
  }
  

  constructor() { }
}
