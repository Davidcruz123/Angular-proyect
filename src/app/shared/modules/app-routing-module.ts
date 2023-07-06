import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { RecipeDetailComponent, RecipeEditComponent, RecipesComponent, ShoppingListComponent } from "src/app/components";


export const appRoutes:Routes = [
    {path:"", redirectTo:"recipes", pathMatch: 'full' },
    {path:"recipes",component:RecipesComponent, children:[
        {path:"new", component:RecipeEditComponent}, // first new path and then the id, otherwise it would take 'new' as Id
        {path: ":id", component:RecipeDetailComponent},
        {path:":id/edit", component:RecipeEditComponent},
    ]},
    {path:"shopping-list", component:ShoppingListComponent}
]

@NgModule({
    imports:[
        RouterModule.forRoot(appRoutes)
    ],
    exports:[RouterModule]
})
export class AppRoutingModule {

}