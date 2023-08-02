import { Injectable } from '@angular/core';
import { Observable, exhaustMap, take, tap } from 'rxjs';
import { Recipe } from '../models/recipes.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { RecipeService } from './recipe.service';
import { AuthService } from './auth.service';


const DATABASE_URL = "https://angular-recipe-book-d354a-default-rtdb.firebaseio.com/recipes.json"

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor(private http: HttpClient, private recipeService: RecipeService, private authService: AuthService) { }

  public fetchRecipes(): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(DATABASE_URL).pipe( tap(recipes => {
      this.recipeService.recipes = recipes;
    })) 

    // return this.authService.userSubject.pipe(take(1), //user is a behavior subject, this allows us to extract the value, even when we are not in the next statement
    //  exhaustMap(user => {
    //   return this.http.get<Recipe[]>(DATABASE_URL,{
    //     params: new HttpParams().set('auth',user.token)
    //   })
    // }),
    //  tap(recipes => {
    //   this.recipeService.recipes = recipes;
    // }))

  }
  public saveRecipes(): void {
    const recipes = this.recipeService.recipes;
    this.http.put(DATABASE_URL, recipes)
      .subscribe({
        next: response => {
          console.log(response)
        },
        error: error => {
          console.log(error)  // TODO:show error message
        }
      });
  }
}


