class Customer{
    #CustomerName;
    #CustomerType;
    
    constructor(Name, Type){
        this.CustomerName = Name;
        this.CustomerType = Type;
    }

    GetName(){
        return this.#CustomerName;
    }
}