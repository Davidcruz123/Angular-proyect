import { Component, ViewChild } from '@angular/core';
import { Ingredient } from '../../../shared/models/ingredient.model';
import { ShoppingListService } from 'src/app/shared/services/shopping-list.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
})
export class ShoppingEditComponent {
  @ViewChild("formRefence") form:NgForm;
  constructor(private shoppingListService : ShoppingListService) {

  }
  public AddElement():void{
      const formValues = this.form.value
      this.shoppingListService.addIngredient(new Ingredient(formValues.productName,+formValues.amount));
      this.form.reset()
  }

}
