import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { AppComponent } from "./app.component";
import { HeaderComponent, RecipeDetailComponent, RecipeListComponent, RecipeItemComponent, ShoppingListComponent, ShoppingEditComponent, RecipesComponent, RecipeEditComponent, LoadingSpinnerComponent } from "./components";
import { AppRoutingModule } from "./shared";
import { DropdownDirective } from "./shared/directives/dropdown.directive";
import { AuthComponent } from "./components/auth/auth.component";




@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    RecipeDetailComponent,
    RecipeListComponent,
    RecipeItemComponent,
    ShoppingListComponent,
    ShoppingEditComponent,
    RecipesComponent,
    DropdownDirective,
    RecipeEditComponent,
    AuthComponent,
    LoadingSpinnerComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
