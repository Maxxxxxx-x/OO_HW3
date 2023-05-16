import { CustomerTypes } from "./../config.js";
import {} from "./Store.js";

export class Customer{
    #Name;
    #Type;
    #Store;
    #Rented;
    constructor({Name, Store}){
        this.#Name = Name;
        this.#Store = Store;
        const Types = Object.keys(CustomerTypes);
        this.#Type = Types[Math.floor(Math.random() * Types.length)];
    }

    GetName(){
        return this.#Name;
    }

    GetType(){
        return this.#Type;
    }

    DoReturn(){

    }
    /*
    TODO:
    Breezy: 2 vid for 1-2 nights
    Regular: 1-3 vid for 3-5 nights
    Hoarder: 3 vid for 3-5 nights
    */
    #GenerateVideoWishlist(){
        const AvailableVideos = this.#Store.GetAvailableVideos();
        const { Videos, Nights } = CustomerTypes[this.#Type];
        const [ MinVid, MaxVid ] = Videos;
        const [ MinNights, MaxNights ] = Nights;
        const NumToRent = Math.floor(MinVid + Math.random() * (MaxVid - MinNights + 1));
        const NumOfNights = Math.floor(MinNights + Math.random() * (MaxNights - MinNights + 1));
        let VideosToRent = [];
        for (let i = 0; i < NumToRent; i++){
            const TargetVideo = AvailableVideos[Math.floor(Math.random() * AvailableVideos.length)];
            VideosToRent[i] = TargetVideo;
        }
        this.#Store.Rent({ Name: this.#Name, Type: this.#Type }, VideosToRent, NumOfNights);
    }

    DoBorrow(){
        this.#GenerateVideoWishlist();
    }
}