import { CustomerNameList, VideoNameList, StoreRules } from "./config.js";
import { Customer } from "./Classes/Customer.js";
import { Video } from "./Classes/Video.js";

function initCustomers() {
    let Customers = [];
    for (let i = 0; i < CustomerNameList.length; i++) {
        Customers[i] = new Customer({Name: CustomerNameList[i]});
    }
    return Customers;
}

function initVideos(){
    let MovieList = [];
    for (let i = 0; i < VideoNameList.length; i++){
        const [VideoCatagory, VideoName] = VideoNameList[i].split(": ");
        MovieList[i] = (new Video({Name: VideoName, Category: VideoCatagory}));
    }
    return MovieList;
}

function DoReturnPhase(){

}

function DoBusiness(){

}

function StartCycle(){
    const CustomerList = initCustomers();
    const VideoList = initVideos();
    for (let i = 1; i <= StoreRules.Days; i++){
        DoReturnPhase();
        DoBusiness();
    }
}


StartCycle();
