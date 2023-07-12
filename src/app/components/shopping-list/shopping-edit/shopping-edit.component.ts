import { Component, OnInit, ViewChild } from '@angular/core';
import { Ingredient } from '../../../shared/models/ingredient.model';
import { ShoppingListService } from 'src/app/shared/services/shopping-list.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild("formRefence") form:NgForm;
  public isEditMode = false;
  constructor(private shoppingListService : ShoppingListService) {

  }
  ngOnInit(): void {
    this.shoppingListService.ingredientSelected.subscribe(ingredient=>{
      this.form.setValue({
        productName:ingredient.name,
        amount:ingredient.amount
      });
      this.isEditMode = true;
    })
  }
  public submitForm():void{
    const formValues = this.form.value;
    const ingredient = new Ingredient(formValues.productName,+formValues.amount);
    if (!this.isEditMode) {
      this.shoppingListService.addIngredient(ingredient);
    }else {
      this.shoppingListService.updateIngredient(ingredient);
      this.isEditMode=false;
    }
    this.form.reset();
  }

  public clear():void {
    this.form.reset();
    this.isEditMode=false;
  }


}
