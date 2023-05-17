
class BaseVideo {
    #Name;
    #IsRented = false;

    constructor(Name) {
        this.#Name = Name;
    }

    GetName() {
        return this.#Name;
    }

    GetRentalStatus() {
        return this.#IsRented;
    }

    ChangeRentalStatus(Bool) {
        this.#IsRented = Bool;
    }
}

function CreateVideo({ Category, Price }) {
    return class extends BaseVideo {
        #PricePerDay = Price;
        #Category = Category;

        constructor({ Name }) {
            super(Name);
        }

        GetCategory() {
            return this.#Category;
        }

        GetPricePerDay() {
            return this.#PricePerDay;
        }

        ChangeRentalStatus(Bool) {
            super.ChangeRentalStatus(Bool);
        }
    };
}

export default CreateVideo;
