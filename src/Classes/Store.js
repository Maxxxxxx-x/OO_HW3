import { randomUUID } from "../Modules/Util.js";
import { Logs } from "./Logs.js";

export class Store{
    #Logs;
    #Videos;
    #CurrentDay;
    #ActiveRental = {};
    #Tracker = 0;
    constructor({VideoList: VideoList}){
        this.#Videos = VideoList;
        this.#Logs = new Logs({ Name: "StoreLogs" });
        this.#Logs.Create(["Transaction", "RentalLogs", "RentalCompleted"]);
    }

    GetAvailableVideos(){
        let AvailableVidoes = [];
        for (const VideoName in this.#Videos){
            const CurrentVideo = this.#Videos[VideoName];
            if (CurrentVideo.GetRentalStatus() === true) continue;
            AvailableVidoes.push(CurrentVideo.GetName());
        }
        return AvailableVidoes;
    }

    Rent(Customer, VideosToRent, NumOfNights){
        const TransactionId = randomUUID();
        const Logs = this.#Logs;
        const { Name, Type } = Customer;
        let Subtotal = 0;
        for (let i = 0; i < VideosToRent.length; i++){
            const Video = this.#Videos[VideosToRent[i]];
            Video.ChangeRentalStatus();
            Subtotal += Video.GetPricePerDay() * NumOfNights;
        }
        console.log(`Rental | Name: ${Name} | Type: ${Type} | Video count: ${VideosToRent.length} | Nights: ${NumOfNights} | Return Date: ${this.#CurrentDay + NumOfNights}`);
        this.#ActiveRental[Name] = TransactionId;
        Logs.Add({
            Category: "RentalLogs",
            id: TransactionId,
            Data: {Name: Name, Videos: VideosToRent, ReturnDate: this.#CurrentDay + NumOfNights}
        });
        Logs.Add({
            Category: "Transaction",
            id:TransactionId,
            Data: { Name: Name, Subtotal: Subtotal}
        });
    }

    Return(Customer, VideosToReturn){
        const Logs = this.#Logs;
        const { Name, Type } = Customer;
        const TransactionId = this.#ActiveRental[Name];
        for (let i = 0; i < VideosToReturn.length; i++){
            const Video = this.#Videos[VideosToReturn[i]];
            Video.ChangeRentalStatus();
        }
        console.log(`Return | Name: ${Name} | Type: ${Type} | has returned ${VideosToReturn.length}`);
        Logs.Remove("RentalLogs", TransactionId);
        Logs.Add({
            Category: "RentalCompleted",
            id: TransactionId,
            Data: {Name: Name, Videos: VideosToReturn}
        });
    }

    StartDay(CurrentDay){
        this.#CurrentDay = CurrentDay;
    }

    EndDay(){
    }
    EndSimulation(){
        const Logs = this.#Logs;
        const Transactions = Logs.GetLogs("Transaction");
        console.log(Logs.GetLogs());
        let Total = 0;
        for (let i = 0; i < Transactions.length; i++){
            Total += Transactions[i].Subtotal;
        }
        console.log(`Earned a total of: ${Total}`)
    }
}