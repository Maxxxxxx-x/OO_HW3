import { CustomerNameList, VideoNameList, StoreRules } from "./config.js";
import { Customer } from "./Classes/Customer.js";
import { Store } from "./Classes/Store.js";
import { Video } from "./Classes/Video.js";


function initCustomers(NStore) {
    let Customers = [];
    for (let i = 0; i < CustomerNameList.length; i++) {
        Customers[i] = new Customer({ Name: CustomerNameList[i], Store: NStore});
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

function DoReturnPhase(CustomerList){
    for (let i = 0; i < CustomerList.length; i++){
        CustomerList[i].DoReturn();
    }
}

function DoBusinessPhase(){

}

function StartCycle(){
    const VideoList = initVideos();
    const NStore = new Store({VideoList: VideoList});
    const CustomerList = initCustomers(NStore);
    for (let Day = 1; Day <= StoreRules.Days; Day++){
        DoReturnPhase(CustomerList);
    }
}

StartCycle();