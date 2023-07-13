import { Component, DoCheck, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipeService } from 'src/app/shared/services/recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styles: [`
  .reverse-elements {
    display:flex;
    flex-direction:column-reverse;
  }
  `]
})
export class RecipeEditComponent implements OnInit {
  public recipeEditForm: FormGroup;
  public recipeId: string;
  public isFormModified=false;

  constructor(private route: ActivatedRoute,
    private recipeService: RecipeService,
    private router: Router) {

  }
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      // if id exists the route is /:id/edit if not the route is /new
      this.recipeId = params.id;
      this.initForm();
    })


    const initialValue = JSON.stringify(this.recipeEditForm.value);
    this.recipeEditForm.valueChanges.subscribe(value=>{
      this.isFormModified = initialValue !== JSON.stringify(value);
    });
  }

  private initForm(): void {
    let nameInitialValue = "";
    let imagePathInitialValue = "";
    let descriptionInitialValue = "";
    let ingredientsControlInitialValue: FormArray = new FormArray([]);
    if (this.recipeId) {
      const recipe = this.recipeService.getRecipeById(this.recipeId);
      nameInitialValue = recipe.name;
      imagePathInitialValue = recipe.imagePath;
      descriptionInitialValue = recipe.description;
      recipe.ingredients.forEach(ingredient => {
        ingredientsControlInitialValue.push(new FormGroup({
          name: new FormControl(ingredient.name, Validators.required),
          amount: new FormControl(ingredient.amount, [Validators.required, Validators.pattern("^[1-9]+[0-9]*$")]),
        })); //it is not a formControl, it must be a form group
      })
    } else {
      ingredientsControlInitialValue.push(new FormGroup({
        name: new FormControl(null, Validators.required),
        amount: new FormControl(null, [Validators.required, Validators.pattern("^[1-9]+[0-9]*$")]),
      }));
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
    (this.recipeEditForm.get("ingredients") as FormArray).push(control);

  }

  public deleteIngredient(ingredientIndex: number): void {
    (this.recipeEditForm.get("ingredients") as FormArray).removeAt(ingredientIndex);
  }

  public submitForm(): void {
    // Todo: add async validator to valid if image exists
    if (this.recipeId) { // is edit mode
      this.recipeService.updateRecipe(this.recipeId, this.recipeEditForm.value);
      this.router.navigate(["recipes", this.recipeId]);
    } else {
      this.recipeService.addRecipe(this.recipeEditForm.value);
      this.router.navigate(["recipes"]);
    }
  }
  public onCancel(): void {
    if (this.recipeId) { // is edit mode
      this.router.navigate(["recipes", this.recipeId]);
    } else {
      this.router.navigate(["recipes"]);
    }
  }
}
