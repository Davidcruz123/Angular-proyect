import { Injectable, OnInit } from '@angular/core';
import { Recipe } from '../models/recipes.model';

import { Subject } from 'rxjs';
import { HttpService } from './http.service';


@Injectable({
  providedIn: 'root'
})
export class RecipeService   {
  private _recipeList: Recipe[] = [
    // new Recipe('Ratatouille', "Indulge in this classic Ratatouille, a vibrant and flavorful dish that'll transport you straight to the heart of France. ", "https://www.howtocook.recipes/wp-content/uploads/2021/05/Ratatouille-recipe.jpg", [new Ingredient("Eggplants", 2), new Ingredient("Roma Tomates", 6), new Ingredient("Yellow Squashes",2)]),
    // new Recipe('A test recipe 2', "This is a simple recipe 2", "https://www.simplyrecipes.com/thmb/4_wTLA6Q_2o7dgNO-ze0w7oeX_w=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/Simply-Recipes-Homemade-Pizza-Dough-Lead-Shot-1b-ea13798d224048b3a28afb0936c9b645.jpg", [new Ingredient("Test Ingredient3", 15)])
  ];
  public recipesUpdated = new Subject<Recipe[]>();

  get recipes(): Recipe[] {
    return [...this._recipeList];
  }

  constructor(private httpService:HttpService) {
    this.fetchRecipes();
   }

  public getRecipeById(id: string): Recipe {
    const recipes = this._recipeList.filter(recipe => {
      return recipe.id == id
    })
    return recipes[0];
  }

  public updateRecipe(currentRecipeId:string,data:Recipe): void {
    const arrayIndex = this._recipeList.findIndex(recipe=>recipe.id ==currentRecipeId);
    this._recipeList[arrayIndex] = Object.assign(this._recipeList[arrayIndex],data)
    this.httpService.updateRecipe(this._recipeList).subscribe(response=>{
      console.log("update",response);
    });


  }
  public addRecipe(recipe:Recipe):void { 
    this.httpService.createRecipe(recipe).subscribe(response=>{
      this._recipeList.push(new Recipe(recipe.name,recipe.description,recipe.imagePath,recipe.ingredients,response.name));
      this.recipesUpdated.next( [...this._recipeList] );
      //handle error scenarios
    });

  }
  private fetchRecipes(){
    this.httpService.fetchRecipes().subscribe(response=>{
      this._recipeList = response;
      console.log(response);
      this.recipesUpdated.next( [...this._recipeList] );
    });
  }
  public deleteRecipe(recipeId:string):void {
    const arrayIndex = this._recipeList.findIndex(recipe=>recipe.id ==recipeId);
    this._recipeList.splice(arrayIndex,1);
    this.recipesUpdated.next( [...this._recipeList] );
  }
}
