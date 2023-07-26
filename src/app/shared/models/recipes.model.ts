import { Ingredient } from "./ingredient.model";

export class Recipe {

    public id :string;
    constructor(public name: string, public description: string, public imagePath: string,public ingredients:Ingredient[]) {
        this.id = `rec-${Math.floor(Math.random()*1000000)}`;
    }
}