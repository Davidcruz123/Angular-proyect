import { Component, Input, Output } from '@angular/core';
import { Recipe } from '../../../../shared/models/recipes.model';
import { RecipeService } from 'src/app/shared/services/recipe.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
})
export class RecipeItemComponent {
  @Input() recipe:Recipe;
  constructor(private recipeService:RecipeService,private router:Router, private route: ActivatedRoute) {
  }
  
  public recipeSelected():void{
    this.router.navigate([this.recipe.id], {relativeTo:this.route});
  }
}
