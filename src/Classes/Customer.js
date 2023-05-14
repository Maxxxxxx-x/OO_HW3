export class Customer{
    #Name;
    #Type;
    
    constructor(Name, Type){
        this.#Name = Name;
        this.#Type = Type;
    }

    GetName(){
        return this.#Name;
    }

    GetType(){
        return this.#Type;
    }
}