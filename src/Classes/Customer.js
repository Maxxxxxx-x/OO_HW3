import { CustomerTypes } from "./../config.js";
import { Random } from "./../Modules/Util.js";

export class Customer{
    #Name;
    #Type;
    #Store;
    #Rented;
    #ReturnDate;

    constructor({Name, Store}){
        this.#Name = Name;
        this.#Store = Store;
        const Types = Object.keys(CustomerTypes);
        this.#Type = Types[Random(0, Types.length)];
    }

    GetName(){
        return this.#Name;
    }

    GetType(){
        return this.#Type;
    }

    #GenerateVideoWishlist(){
        let AvailableVideos = this.#Store.GetAvailableVideos();
        let AvailableCount = AvailableVideos.length;
        if (AvailableCount< 1){
            console.log(`Name: ${ this.#Name } | Type: ${this.#Type} | No Videos`);
            return [false, false];
        }
        const { Videos, Nights } = CustomerTypes[this.#Type];
        let [ MinVid, MaxVid ] = Videos;
        const [ MinNights, MaxNights ] = Nights;
        const NumToRent = Random(MinVid, MaxVid);
        const NumOfNights = Random(MinNights, MaxNights);
        console.log(this.#Type);
        if (this.#Type === "Hoarder" && AvailableCount < MinVid){
            console.log(`Name: ${ this.#Name } | Type: ${this.#Type} | Not enough videos`);
            return [false, false];
        }
        
        MaxVid = AvailableCount >= MaxVid ? MaxVid : AvailableCount;
        let VideosToRent = [];
        for (let i = 0; i < NumToRent; i++){
            const VideoIndex = Math.floor(Math.random() * AvailableVideos.length);
            const TargetVideo = AvailableVideos[VideoIndex];
            VideosToRent[i] = TargetVideo;
            AvailableVideos.splice(VideoIndex, 1);
        }
        return [VideosToRent, NumOfNights];
    }

    DoBorrow(CurrentDay){
        if (this.#Rented) return;
        const [ VideosToRent, NumOfNights ] = this.#GenerateVideoWishlist();
        if (!(VideosToRent && NumOfNights)) return;
        this.#ReturnDate = CurrentDay + NumOfNights;
        this.#Rented = VideosToRent;
        this.#Store.Rent({ Name: this.#Name, Type: this.#Type }, VideosToRent, NumOfNights);
    }

    DoReturn(CurrentDay){
        if (!this.#Rented) return;
        if (this.#ReturnDate !== CurrentDay) return;
        this.#Store.Return({ Name: this.#Name, Type: this.#Type }, this.#Rented);
        this.#Rented = null;
        this.#ReturnDate = null;
    }
}