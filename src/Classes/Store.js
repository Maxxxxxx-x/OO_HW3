import {} from "./../config.js";

export class Store{
    #Videos;
    constructor({VideoList: VideoList}){
        this.#Videos = VideoList;
    }

    GetAvailableVideos(){
        let AvailableVidoes = [];
        for (let i = 0; i < this.#Videos.length; i++){
            const CurrentVideo = this.#Videos[i];
            if (CurrentVideo.GetRentalStatus()) continue;
            AvailableVidoes.push(CurrentVideo.GetName());
        }
        return AvailableVidoes;
    }

    Rent(Customer, VideosToRent, NumOfNights){
        const { Name, Type } = Customer;
    }
}