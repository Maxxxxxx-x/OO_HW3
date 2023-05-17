import { Logs } from "./Logs.js";
import chalk from "chalk";

export class Store{
    #Logs;
    #Videos;
    #CurrentDay;
    #ActiveRental = {};
    #Tracker = 0;
    constructor({VideoList: VideoList}){
        this.#Videos = VideoList;
        this.#Logs = new Logs({ Name: "StoreLogs" });
        this.#Logs.Create(["Transactions", "RentalLogs", "RentalCompleted"]);
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
        const Logs = this.#Logs;
        const { Name, Type } = Customer;
        let Subtotal = 0;
        for (let i = 0; i < VideosToRent.length; i++){
            const Video = this.#Videos[VideosToRent[i]];
            Video.ChangeRentalStatus(true);
            Subtotal += Video.GetPricePerDay() * NumOfNights;
        }
        console.log(chalk.yellow(`Rental | Name: ${Name} | Type: ${Type} | Video count: ${VideosToRent.length} | Nights: ${NumOfNights} | Return Date: ${this.#CurrentDay + NumOfNights}`));
        Logs.Add({
            Category: "RentalLogs",
            id: Name,
            Data: {
                Videos: VideosToRent,
                RentDate: this.#CurrentDay,
                ReturnDate: this.#CurrentDay + NumOfNights
            }
        });
        Logs.Add({
            Category: "Transactions",
            id:Name,
            Data: {
                Date: this.#CurrentDay,
                Items: VideosToRent.length,
                Subtotal: Subtotal
            }
        });
    }

    Return(Customer, VideosToReturn){
        const Logs = this.#Logs;
        const { Name, Type } = Customer;
        const TransactionRecord = Logs.Find({
            Category: "Transactions",
            id: Name
        });
        const RentalRecord = Logs.Find({
            Category: "RentalLogs",
            id: Name
        });
        for (let i = 0; i < VideosToReturn.length; i++){
            const Video = this.#Videos[VideosToReturn[i]];
            Video.ChangeRentalStatus(false);
        }
        console.log(chalk.green(`Return | Name: ${Name} | Type: ${Type} | Video Count: ${VideosToReturn.length}`));
        Logs.Remove({
            Category: "RentalLogs",
            id: Name
        });
        Logs.Add({
            Category: "RentalCompleted",
            id: Name,
            Data: {
                RentDate: RentalRecord.RentDate,
                ReturnDate: this.#CurrentDay,
                Duration: this.#CurrentDay - RentalRecord.RentDate,
                Videos: VideosToReturn,
                Total: TransactionRecord.Subtotal,
            }
        });
        delete this.#ActiveRental[Name];
    }

    StartDay(CurrentDay){
        this.#CurrentDay = CurrentDay;
    }

    ProduceReport(){
        const Logs = this.#Logs;
        const AvailableVidoes = this.GetAvailableVideos();
        console.log(`Stock:\nNumber of videos currently in the store: ${chalk.green(AvailableVidoes.length)}\nVideo names: ${chalk.green(AvailableVidoes.join(", "))}\n`);
        
        const TransactionLogs = Logs.GetLogs("Transactions");
        const TotalEarnings = TransactionLogs.reduce((Accumulator, { Subtotal }) => Accumulator + Subtotal, 0);
        console.log(`Finance:\nNumber of transactions: ${TransactionLogs.length}\nTotal earnings: ${TotalEarnings}\n`);

        const CompletedLogs = Logs.GetLogs("RentalCompleted");
        console.log("Complete log of completed rentals");
        for (let i = 0; i < CompletedLogs.length; i++){
            console.log(CompletedLogs[i]);
        }
        
        const ActiveLogs = Logs.GetLogs("RentalLogs");
        console.log("\nComplete log of active rentals");
        for (let i = 0; i < ActiveLogs.length; i++){
            console.log(ActiveLogs[i]);
        }
    }
}
