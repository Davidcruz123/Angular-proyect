import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { RecipeDetailComponent, RecipeEditComponent, RecipesComponent, ShoppingListComponent } from "src/app/components";
import { RecipesResolverService } from "../services/recipe-resolver.service";
import { AuthComponent } from "src/app/components/auth/auth.component";
import { AuthGuard } from "../guards/auth-guards.service";


export const appRoutes:Routes = [
    {path:"", redirectTo:"recipes", pathMatch: 'full' },
    {path:"recipes",canActivate:[AuthGuard],component:RecipesComponent, children:[
        {path:"", component:RecipeDetailComponent, pathMatch: 'full' ,data:{
            recipeSelected:false
        }},
        {path:"new", component:RecipeEditComponent}, // first new path and then the id, otherwise it would take 'new' as Id
        {path: ":id", component:RecipeDetailComponent,resolve:[RecipesResolverService]},
        {path:":id/edit", component:RecipeEditComponent,resolve:[RecipesResolverService]},
    ]},
    {path:"shopping-list", component:ShoppingListComponent},
    {path:"auth",component:AuthComponent}
]

@NgModule({
    imports:[
        RouterModule.forRoot(appRoutes)
    ],
    exports:[RouterModule]
})
export class AppRoutingModule {

}