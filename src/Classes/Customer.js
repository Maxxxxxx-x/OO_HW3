const CustomerTypes = ["Regular", "Breezy", "Hoarders"];

export class Customer{
    #Name;
    #Type;
    
    constructor(Name){
        this.#Name = Name;
        this.#Type = CustomerTypes[Math.floor(Math.random() * CustomerTypes.length)];
    }

    GetName(){
        return this.#Name;
    }

    GetType(){
        return this.#Type;
    }
}