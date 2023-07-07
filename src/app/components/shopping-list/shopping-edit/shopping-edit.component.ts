import { Component } from '@angular/core';
import { Ingredient } from '../../../shared/models/ingredient.model';
import { ShoppingListService } from 'src/app/shared/services/shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
})
export class ShoppingEditComponent {
  constructor(private shoppingListService : ShoppingListService) {

  }
  public AddElement(nameInput:HTMLInputElement,amountInput:HTMLInputElement):void{
      this.shoppingListService.addIngredient(new Ingredient(nameInput.value,+amountInput.value));
      nameInput.value = "";
      amountInput.value= "0";
  }

}
