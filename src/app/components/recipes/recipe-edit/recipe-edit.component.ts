import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.less']
})
export class RecipeEditComponent implements OnInit {
  public isEditRecipeMode:boolean;
  constructor(private route:ActivatedRoute){

  }
ngOnInit(): void {
  this.route.params.subscribe(params=>{
    // if id exists the route is /:id/edit if not the route is /new
    this.isEditRecipeMode = !!params.id; 
  })
}
}
