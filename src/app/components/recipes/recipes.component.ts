import { Component } from '@angular/core';
import { Recipe } from '../../shared/models/recipes.model';
import { RecipeService } from 'src/app/shared/services/recipe.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',

})
export class RecipesComponent {
  title = 'angular-project';
  public recipeSelected:Recipe ;
  
  constructor(private recipeService:RecipeService) {
    this.recipeService.recipeSelected.subscribe((newRecipe:Recipe)=>{
      this.recipeSelected= newRecipe;
    })
  }

}
