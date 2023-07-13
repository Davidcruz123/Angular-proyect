import { Component, OnDestroy, OnInit } from '@angular/core';
import { Recipe } from '../../../shared/models/recipes.model';
import { RecipeService } from 'src/app/shared/services/recipe.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
})
export class RecipeListComponent implements OnInit,OnDestroy {
  public recipes:Recipe[] ;
  private recipesUpdatedSubscription:Subscription;

  constructor(private recipeService:RecipeService) {
    this.recipes =recipeService.recipes;
    this.recipesUpdatedSubscription = this.recipeService.recipesUpdated.subscribe(recipes=> {
      this.recipes = recipes;
    })
  }

  ngOnInit(): void {
    console.log("recipe list on init")
  }
  ngOnDestroy(): void {
    this.recipesUpdatedSubscription.unsubscribe();
  }


}
