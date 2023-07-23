import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { Recipe } from "../models/recipes.model";
import { Observable, map } from "rxjs";

const DATABASE_URL = "https://angular-recipe-book-d354a-default-rtdb.firebaseio.com/recipes.json"


@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  public createRecipe(recipe: Recipe): Observable<{ name: string }> {
    return this.http.post<{ name: string }>(DATABASE_URL, recipe);
  }

  public fetchRecipes(): Observable<Recipe[]> {
    return this.http.get<Record<string, Recipe>>(DATABASE_URL)
      .pipe(map(responseData => {
        const recipesArray: Recipe[] = [];
        for (const key in responseData) {
          recipesArray.push({ ...responseData[key], id: key });
        }
        return recipesArray;
      }));
  }
  public updateRecipe(recipes: Recipe[]):Observable<any> {
    const recipeObject = {};
    recipes.forEach(recipe=> {
      recipeObject[recipe.id]={
        name:recipe.name,
        description: recipe.description,
        imagePath: recipe.imagePath,
        ingredients: recipe.ingredients
      }
    })

    return this.http.put(DATABASE_URL, recipeObject)
  }
}
