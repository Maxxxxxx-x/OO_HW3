import UUID from "./../Util/uuid.js";
import { Logs } from "./Logs.js";
import chalk from "chalk";

export class Store {
    #Logs;
    #Videos;
    #CurrentDay;
    constructor({ VideoList: VideoList }) {
        this.#Videos = VideoList;
        this.#Logs = new Logs({ Name: "StoreLogs" });
        this.#Logs.Create(["Transactions", "RentalLogs", "RentalCompleted"]);
    }

    GetAvailableVideos() {
        let AvailableVidoes = [];
        for (const VideoName in this.#Videos) {
            const CurrentVideo = this.#Videos[VideoName];
            if (CurrentVideo.GetRentalStatus() === true) continue;
            AvailableVidoes.push(CurrentVideo.GetName());
        }
        return AvailableVidoes;
    }

    Rent(Name, VideosToRent, NumOfNights) {
        const Logs = this.#Logs;
        const TransactionId = UUID();
        let Subtotal = 0;
        for (let i = 0; i < VideosToRent.length; i++) {
            const Video = this.#Videos[VideosToRent[i]];
            Video.ChangeRentalStatus(true);
            Subtotal += Video.GetPricePerDay() * NumOfNights;
        }
        console.log(chalk.yellow(`Rental | Name: ${Name} | Video count: ${VideosToRent.length} | Nights: ${NumOfNights} | Return Date: ${this.#CurrentDay + NumOfNights}`));
        Logs.Add({
            Category: "RentalLogs",
            id: TransactionId,
            Data: {
                Name: Name,
                Videos: VideosToRent,
                RentDate: this.#CurrentDay,
                ReturnDate: this.#CurrentDay + NumOfNights
            }
        });
        Logs.Add({
            Category: "Transactions",
            id: TransactionId,
            Data: {
                Name: Name,
                Date: this.#CurrentDay,
                Items: VideosToRent.length,
                Subtotal: Subtotal
            }
        });
        return TransactionId;
    }

    Return(Name, Records) {
        let TotalReturned = 0;
        for (let i = 0; i < Records.length; i++) {
            const { id, VideoList } = Records[i];
            const Logs = this.#Logs;
            const TransactionRecord = Logs.Find({
                Category: "Transactions",
                id: id
            });
            const RentalRecord = Logs.Find({
                Category: "RentalLogs",
                id: id
            });
            for (let i = 0; i < VideoList.length; i++) {
                const Video = this.#Videos[VideoList[i]];
                Video.ChangeRentalStatus(false);
            }
            TotalReturned += VideoList.length;
            Logs.Remove({
                Category: "RentalLogs",
                id: id
            });
            Logs.Add({
                Category: "RentalCompleted",
                id: id,
                Data: {
                    Name: Name,
                    RentDate: RentalRecord.RentDate,
                    ReturnDate: this.#CurrentDay,
                    Duration: this.#CurrentDay - RentalRecord.RentDate,
                    Videos: VideoList,
                    Total: TransactionRecord.Subtotal,
                }
            });
        }
        
        console.log(chalk.green(`Return | Name: ${Name} | Video Count: ${TotalReturned}`));
    }

    StartDay(CurrentDay) {
        this.#CurrentDay = CurrentDay;
    }

    ProduceReport() {
        console.log("\n\n\n\nReport: ");
        const Logs = this.#Logs;
        const AvailableVidoes = this.GetAvailableVideos();
        console.log(`Stock:\nNumber of videos currently in the store: ${chalk.green(AvailableVidoes.length)}\nVideo names: ${chalk.green(AvailableVidoes.join(", "))}\n`);

        const TransactionLogs = Logs.GetLogs("Transactions");
        const TotalEarnings = TransactionLogs.reduce((Accumulator, { Subtotal }) => Accumulator + Subtotal, 0);
        console.log(`Finance:\nNumber of transactions: ${TransactionLogs.length}\nTotal earnings: ${TotalEarnings}\n`);

        const CompletedLogs = Logs.GetLogs("RentalCompleted");
        console.log("Complete log of completed rentals");
        for (let i = 0; i < CompletedLogs.length; i++) {
            console.log(CompletedLogs[i]);
        }

        const ActiveLogs = Logs.GetLogs("RentalLogs");
        console.log("\nComplete log of active rentals");
        for (let i = 0; i < ActiveLogs.length; i++) {
            console.log(ActiveLogs[i]);
        }
    }
}
