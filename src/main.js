import { CustomerNameList, VideoNameList, SimulationSettings, TestSettings } from "./config.js";
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
    let MovieList = {};
    for (let i = 0; i < VideoNameList.length; i++){
        const [VideoCatagory, VideoName] = VideoNameList[i].split(": ");
        MovieList[VideoName] = new Video({Name: VideoName, Category: VideoCatagory});
    }
    return MovieList;
}

function DoReturnPhase(CustomerList, CurrentDay){
    if (CurrentDay === 1) return;
    console.log("---------------------------");
    console.log("Return Phase");
    for (let i = 0; i < CustomerList.length; i++){
        const Customer = CustomerList[i];
        Customer.DoReturn(CurrentDay);
    }
}

function DoBusinessPhase(CustomerList,CurrentDay){
    console.log("---------------------------");
    console.log("Business Phase");
    for (let i = 0; i < CustomerList.length; i++){
        const Customer = CustomerList[i];
        Customer.DoBorrow(CurrentDay);
    }
}

function StartCycle(){
    const VideoList = initVideos();
    const NStore = new Store({VideoList: VideoList});
    const CustomerList = initCustomers(NStore);
    for (let CurrentDay = 1; CurrentDay <= SimulationSettings.Days; CurrentDay++){
        Store.StartDay(CurrentDay);
        DoReturnPhase(CustomerList, CurrentDay);
        DoBusinessPhase(CustomerList, CurrentDay);
        Store.EndDay();
    }
}

//StartCycle();

function Test(){
    const VideoList = initVideos();
    const NStore = new Store({VideoList: VideoList});
    const CustomerList = initCustomers(NStore);
    console.log("================================================");
    for (let CurrentDay = 1; CurrentDay <= TestSettings.TotalSimulatedDays; CurrentDay++){
        console.log(`Start of day ${CurrentDay}`);
        NStore.StartDay(CurrentDay);
        DoReturnPhase(CustomerList, CurrentDay);
        DoBusinessPhase(CustomerList, 1);
        NStore.EndDay();
        console.log(`End of day ${CurrentDay}`);
        console.log("================================================");
    }
    NStore.EndSimulation();
}

Test();
