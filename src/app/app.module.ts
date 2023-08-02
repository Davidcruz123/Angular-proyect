import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { AppComponent } from "./app.component";
import { HeaderComponent, RecipeDetailComponent, RecipeListComponent, RecipeItemComponent, ShoppingListComponent, ShoppingEditComponent, RecipesComponent, RecipeEditComponent, LoadingSpinnerComponent } from "./components";
import { AppRoutingModule } from "./shared";
import { DropdownDirective } from "./shared/directives/dropdown.directive";
import { AuthComponent } from "./components/auth/auth.component";
import { AuthInterceptorService } from "./shared/interceptors/auth-interceptor.service";
import { AlertComponent } from './components/alert/alert.component';




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
    LoadingSpinnerComponent,
    AlertComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [{provide:HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
