import { CategoryPrices } from "./../config.js";

export class Video{
    #Name;
    #Category;
    #pricePerDay;
    #isRented = false;

    constructor({Name, Category}){
        this.#Name = Name;
        this.#Category = Category;
        //Changed to a hashmap since its faster than switch cases
        
        this.#pricePerDay = CategoryPrices[Category];
    }

    GetName(){
        return this.#Name;
    }

    GetCategory(){
        return this.#Category;
    }

    GetRentalStatus(){
        return this.#isRented;
    }

    GetPricePerDay(){
        return this.#pricePerDay;
    }

    ChangeRentalStatus(){
        this.#isRented = !this.#isRented;
    }
}