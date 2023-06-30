import { Component, EventEmitter, Output } from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
})
export class ShoppingEditComponent {
  @Output() onAddElment = new EventEmitter<Ingredient>();

  public AddElement(nameInput:HTMLInputElement,amountInput:HTMLInputElement):void{
    this.onAddElment.emit( new Ingredient(nameInput.value,+amountInput.value));
      nameInput.value = "";
      amountInput.value= "0";
  }
}
