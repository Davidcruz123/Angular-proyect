import { Component, Input, OnInit } from '@angular/core';
import { Recipe } from '../../../shared/models/recipes.model';
import { ShoppingListService } from 'src/app/shared/services/shopping-list.service';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipeService } from 'src/app/shared/services/recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
})
export class RecipeDetailComponent implements OnInit {
  public recipeData: Recipe;
  private recipeId: string;
  public recipeSelected = true;

  constructor(private shoppingListService: ShoppingListService,
    private recipeService: RecipeService,
    private router: Router,
    private route: ActivatedRoute) {
  }

  public ngOnInit(): void {
    this.recipeSelected = this.route.snapshot.data["recipeSelected"];

    this.route.params.subscribe((params) => {
      this.recipeId = params.id;
      if (this.recipeId) {
        this.recipeSelected=true;
        this.recipeData = this.recipeService.getRecipeById(params.id);
      }

    })

  }

  public addIngredientsToShoppingList(): void {
    this.shoppingListService.addIngredients([...this.recipeData.ingredients])
    this.router.navigate(["./shopping-list"]);
  }

  public deleteRecipe(): void {
    this.recipeService.deleteRecipe(this.recipeId);
    this.router.navigate(["recipes"]);
  }
}
