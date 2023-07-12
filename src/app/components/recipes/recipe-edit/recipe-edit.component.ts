import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RecipeService } from 'src/app/shared/services/recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styles:[`
  .reverse-elements {
    display:flex;
    flex-direction:column-reverse;
  }
  `]
})
export class RecipeEditComponent implements OnInit {
  public isEditRecipeMode: boolean;
  public recipeEditForm: FormGroup;
  constructor(private route: ActivatedRoute, private recipeService: RecipeService) {

  }
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      // if id exists the route is /:id/edit if not the route is /new
      this.isEditRecipeMode = !!params.id;
      this.initForm(params.id);
    })

  }

  public initForm(recipeId: string): void {
    let nameInitialValue = "";
    let imagePathInitialValue = "";
    let descriptionInitialValue = "";
    let ingredientsControlInitialValue: FormArray = new FormArray([]);
    if (recipeId) {
      const recipe = this.recipeService.getRecipeById(recipeId);
      nameInitialValue = recipe.name;
      imagePathInitialValue = recipe.imagePath;
      descriptionInitialValue = recipe.description;
      recipe.ingredients.forEach(ingredient => {
        ingredientsControlInitialValue.push(new FormGroup({
          name: new FormControl(ingredient.name, Validators.required),
          amount: new FormControl(ingredient.amount, Validators.required),
        })); //it is not a formControl, it must be a form group
      })
    }
    this.recipeEditForm = new FormGroup({
      name: new FormControl(nameInitialValue, [Validators.required]),
      imagePath: new FormControl(imagePathInitialValue, [Validators.required]),
      description: new FormControl(descriptionInitialValue, [Validators.required]),
      ingredients: ingredientsControlInitialValue
    })

  }

  public getControls() {
    return (this.recipeEditForm.get("ingredients") as FormArray).controls;
  }

  public addIngredient(): void {
    const control = new FormGroup({
      name: new FormControl(null, Validators.required),
      amount: new FormControl(null, [Validators.required, Validators.pattern("^[1-9]+[0-9]*$")]),
    }); 
    (this.recipeEditForm.get("ingredients") as FormArray).push( control );

  }

  public deleteIngredient(ingredientIndex:number):void {
    (this.recipeEditForm.get("ingredients") as FormArray).removeAt(ingredientIndex);
  }

  public submitForm(): void {
    console.log(this.recipeEditForm)
  }
}
