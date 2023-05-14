export class Video{
    #Name;
    #Category;
    #isRented = false;
    #pricePerDay;

    constructor(Name, Category){
        this.#Name = Name;
        this.#Category = Category;
        switch(Category){
        case "New Release":
            this.#pricePerDay = 1;
            break;
        case "Drama":
            this.#pricePerDay = 2;
            break;
        case "Comedy":
            this.#pricePerDay = 3;
            break;
        case "Romance":
            this.#pricePerDay = 4;
            break;
        case "Horror":
            this.#pricePerDay = 5;
            break;
        }
    }

    GetName(){
        return this.#Name;
    }

    GetCategory(){
        return this.#Category;
    }

    GetRentalStat(){
        return this.#isRented;
    }

    GetPricePerDay(){
        return this.#pricePerDay;
    }

    SwitchRentalStat(){
        this.#isRented = !this.#isRented;
    }
}