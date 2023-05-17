import { CustomerTypes } from "./../config.js";
import Random from "../Util/Random.js";

class BaseCustomer {
    #Name;
    #Store;
    #Rental = [];

    constructor(Name, Store) {
        this.#Name = Name;
        this.#Store = Store;
    }

    GetName() {
        return this.#Name;
    }

    GetRentedVideos() {
        return this.#Rental.flatMap((e) => e.VideoList);
    }

    #GetAvailableVideos() {
        return this.#Store.GetAvailableVideos();
    }

    GenerateWishList(VideoNumLUT, RentalDaysLUT) {
        let AvailableVideos = this.#GetAvailableVideos();
        const AvailableCount = AvailableVideos.length;
        if (AvailableCount < 1) return false;
        let [VMin, VMax] = VideoNumLUT;
        const [NMin, NMax] = RentalDaysLUT;
        let NumToRent = Random(VMin, VMax);
        const Duration = Random(NMin, NMax);
        let VidoesToRent = [];
        for (let i = 0; i < NumToRent; i++) {
            const VideoIndx = Random(0, AvailableVideos.length);
            const Target = AvailableVideos[VideoIndx];
            if (!Target) continue;
            VidoesToRent[i] = Target;
            AvailableVideos.splice(VideoIndx, 1);
        }
        return [VidoesToRent, Duration];
    }

    #AddRentalRecord(Id, VideoList, ReturnDate) {
        this.#Rental.push({
            id: Id,
            ReturnDate: ReturnDate,
            VideoList: VideoList
        });
    }

    #RemoveRentalRecord(ReturnDate) {
        this.#Rental = this.#Rental.filter((Record) => Record.ReturnDate !== ReturnDate);
    }

    Rent(Wishlist, CurrentDay, Duration) {
        const TransactionId = this.#Store.Rent(this.#Name, Wishlist, Duration);
        this.#AddRentalRecord(TransactionId, Wishlist, CurrentDay + Duration);
    }

    Return(CurrentDay) {
        const VideoList = this.#Rental;
        if (VideoList.length < 1) return;
        const Records = this.#Rental
            .filter((e) => e.ReturnDate === CurrentDay)
            .map((e) => ({ id: e.id, VideoList: e.VideoList }));
        if (Records.length < 1) return;
        this.#Store.Return(this.#Name, Records);
        this.#RemoveRentalRecord(CurrentDay);
    }
}

function CreateCustomer({ Type }) {
    return class extends BaseCustomer {
        #Type = Type;
        #VideoNumLUT;
        #RentalDaysLUT;

        constructor({ Name, Store }) {
            super(Name, Store);
            const { Videos, Nights } = CustomerTypes[this.#Type];
            this.#VideoNumLUT = Videos;
            this.#RentalDaysLUT = Nights;
        }

        Rent(CurrentDay) {
            const HasRented = super.GetRentedVideos().length;
            if (HasRented >= 3) return;
            if (Math.floor(Math.random() * 2)) return;
            const Returned = super.GenerateWishList(this.#VideoNumLUT, this.#RentalDaysLUT);
            if (Returned === false) return;
            const [ Wishlist, Duration ] = Returned;
            if (Wishlist.length < 3 && this.#Type == "Hoarder") return;
            super.Rent(Wishlist, CurrentDay, Duration);
        }

        Return(CurrentDay) {
            super.Return(CurrentDay);
        }
    };
}

export default CreateCustomer;
