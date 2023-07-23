import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Recipe } from '../models/recipes.model';
import { HttpClient } from '@angular/common/http';
import { RecipeService } from './recipe.service';


const DATABASE_URL = "https://angular-recipe-book-d354a-default-rtdb.firebaseio.com/recipes.json"

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor(private http: HttpClient, private recipeService: RecipeService) { }

  public fetchRecipes(): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(DATABASE_URL)
    .pipe(tap(recipes=> {
      console.log("tap")
      this.recipeService.recipes = recipes;
    }));
  }
  public saveRecipes():void  {
    const recipes= this.recipeService.recipes;
    this.http.put(DATABASE_URL,recipes)
    .subscribe({
      next:response=> {
        console.log("recipes saved successfully")
        console.log(response)
      },
      error: error=> {
        console.log(error)  // TODO:show error message
      }
    });
  }
}


