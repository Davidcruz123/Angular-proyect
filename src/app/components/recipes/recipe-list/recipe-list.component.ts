import { Component, OnInit } from '@angular/core';
import { Recipe } from '../../../shared/models/recipes.model';
import { RecipeService } from 'src/app/shared/services/recipe.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
})
export class RecipeListComponent implements OnInit {
  public recipes:Recipe[] ;

  constructor(private recipeService:RecipeService) {
    this.recipes =recipeService.recipes;
  }

  ngOnInit(): void {
  }


}
