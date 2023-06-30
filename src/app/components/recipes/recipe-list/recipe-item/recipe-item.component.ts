import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Recipe } from '../../recipes.model';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
})
export class RecipeItemComponent {
  @Input() recipe:Recipe;
  @Output() onRecipeSelected = new EventEmitter<void>();
  
  public recipeSelected():void{
    this.onRecipeSelected.emit();
  }
}
