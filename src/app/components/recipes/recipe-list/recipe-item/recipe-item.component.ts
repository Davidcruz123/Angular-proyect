import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Recipe } from '../../../../shared/models/recipes.model';
import { RecipeService } from 'src/app/shared/services/recipe.service';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
})
export class RecipeItemComponent {
  @Input() recipe:Recipe;
  constructor(private recipeService:RecipeService) {
  }
  
  public recipeSelected():void{
    this.recipeService.recipeSelected.emit(this.recipe);
  }
}
