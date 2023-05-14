class Customer{
    #Name;
    #Type;
    
    constructor(Name, Type){
        this.#Name = Name;
        this.#Type = Type;
    }

    get GetName(){
        return this.#Name;
    }

    get GetType(){
        return this.#Type;
    }
}