import { CustomerTypes } from "./../config.js";
import { Random } from "./../Modules/Util.js";

export class Customer{
    #Name;
    #Type;
    #Store;
    #Rented = [];
    #ReturnDate = 0;

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
        if (AvailableCount< 1) return [false, false];
        const { Videos, Nights } = CustomerTypes[this.#Type];
        let [ MinVid, MaxVid ] = Videos;
        const [ MinNights, MaxNights ] = Nights;
        const NumToRent = Random(MinVid, MaxVid);
        const NumOfNights = Random(MinNights, MaxNights);
        if (this.#Type === "Hoarder" && AvailableCount < MinVid) return [false, false];
        MaxVid = AvailableCount >= MaxVid ? MaxVid : AvailableCount;
        let VideosToRent = [];
        for (let i = 0; i < NumToRent; i++){
            const VideoIndex = Math.floor(Math.random() * AvailableVideos.length);
            const TargetVideo = AvailableVideos[VideoIndex];
            if (TargetVideo){
                VideosToRent[i] = TargetVideo ;
            }
            AvailableVideos.splice(VideoIndex, 1);
        }
        console.log(VideosToRent);
        return [VideosToRent, NumOfNights];
    }

    DoBorrow(CurrentDay){
        if (this.#Rented.length > 0) return;
        //replace random here
        if (Math.floor(Math.random() * 2)) return;
        const [ VideosToRent, NumOfNights ] = this.#GenerateVideoWishlist();
        if (!(VideosToRent && NumOfNights)) return;
        const ReturnDate = CurrentDay + NumOfNights;
        this.#ReturnDate = ReturnDate;
        this.#Rented = VideosToRent;
        this.#Store.Rent({ Name: this.#Name, Type: this.#Type }, VideosToRent, NumOfNights);
    }

    DoReturn(CurrentDay){
        const VideoList = this.#Rented;
        if (VideoList.length < 1) return;
        if (this.#ReturnDate != CurrentDay) return;
        this.#Store.Return({ Name: this.#Name, Type: this.#Type }, VideoList);
        this.#ReturnDate = 0;
        this.#Rented = [];
    }
}