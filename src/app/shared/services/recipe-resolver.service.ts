import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Resolve, RouterState, RouterStateSnapshot } from '@angular/router';
import { Recipe } from '../models/recipes.model';
import { DataStorageService } from './data-storage.service';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class RecipesResolverService implements Resolve<Recipe[]> {

    constructor(private dataStorageService: DataStorageService) { }
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):Recipe[] | Observable<Recipe[]> | Promise<Recipe[]> {
        console.log("resolver");
        return this.dataStorageService.fetchRecipes();
    }

}
