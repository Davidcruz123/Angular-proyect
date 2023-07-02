import { Component, Input } from '@angular/core';
import { Recipe } from '../../../shared/models/recipes.model';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
})
export class RecipeDetailComponent {
  @Input() recipeData:Recipe ;
}
