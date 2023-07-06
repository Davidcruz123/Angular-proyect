import { Ingredient } from "./ingredient.model";

export class Recipe {
    public static idCounter = 0;
    public id :string;
    constructor(public name: string, public description: string, public imagePath: string,public ingredients:Ingredient[]) {
        this.id = `rec-${Recipe.idCounter}`;
        Recipe.idCounter++;
    }
}