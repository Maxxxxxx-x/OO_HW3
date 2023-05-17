export class Logs{
    #Log = {};
    #Name;
    constructor({Name: Name}){
        this.#Name = Name;
    }

    GetName(){
        return this.#Name;
    }

    GetLogs(Category){
        if (!Category) return this.#Log;
        return this.#Log[Category];
    }

    GetCount(Category){
        if (!Category || this.#Log[Category]) return false;
        return Object.keys(this.#Log[Category]).length;
    }

    Create(Names){
        let Exists = [];
        for (let i = 0; i < Names.length; i++){
            const Name = Names[i];
            if (this.#Log[Name]){
                Exists.push(Name);
                continue;
            }
            this.#Log[Name] = [];
        }
        if (Exists.length > 0){
            return Exists;
        }
    }

    Add({Category, id, Data}){
        if (!this.#Log[Category]) return false;
        this.#Log[Category].push({id: id, ...Data});
    }
    Find({Category, id}){
        const Data = this.#Log[Category];
        return Data.find(e => e.id === id);
    }
    Remove({Category, id}){
        if (!this.#Log[Category]) return false;
        const Exists = this.#Log[Category].findIndex(e => e.id === id);
        if (Exists !== -1) this.#Log[Category].splice(Exists, 1);
    }
}