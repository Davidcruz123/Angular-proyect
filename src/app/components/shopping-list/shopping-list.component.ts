import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/models/ingredient.model';
import { ShoppingListService } from 'src/app/shared/services/shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ["./shopping-list.component.less"]
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  public ingredients: Ingredient[];
  private ingredientsUpdatedSubs: Subscription;

  constructor(private shoppingListService: ShoppingListService) {

  }
  ngOnInit(): void {
    this.ingredients = this.shoppingListService.ingredients;
    this.ingredientsUpdatedSubs = this.shoppingListService.ingredientsUpdated.subscribe((ingredients) => this.ingredients = ingredients);
  }
  public editItem(ingredientIndex:number): void {
    this.shoppingListService.selectIngredient(ingredientIndex);
  }
  public deleteIngredient(ingredientIndex:number):void {
    this.shoppingListService.deleteIngredient(ingredientIndex);
  }

  ngOnDestroy(): void {
    this.ingredientsUpdatedSubs.unsubscribe();
  }

}
