import { CustomerNameList, VideoNameList, SimulationSettings } from "./config.js";
import { Customer } from "./Classes/Customer.js";
import { Store } from "./Classes/Store.js";
import { Video } from "./Classes/Video.js";
import chalk from "chalk";

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
    //change random to DoBorrow
    for (let i = 0; i < CustomerList.length; i++){
        const Customer = CustomerList[i];
        Customer.DoBorrow(CurrentDay);
    }
}


function Simulate(){
    const VideoList = initVideos();
    const NStore = new Store({VideoList: VideoList});
    const CustomerList = initCustomers(NStore);
    console.log(chalk.blue.bold(`Starting simulation for ${SimulationSettings.TotalSimulatedDays} days`));
    console.log("================================================");
    for (let CurrentDay = 1; CurrentDay <= SimulationSettings.TotalSimulatedDays; CurrentDay++){
        console.log(`Start of day ${CurrentDay}`);
        NStore.StartDay(CurrentDay);
        DoReturnPhase(CustomerList, CurrentDay);
        DoBusinessPhase(CustomerList, CurrentDay);
        console.log(`End of day ${CurrentDay}`);
        console.log("================================================");
    }
    console.log(chalk.blue.bold("Simulation ended"));
    NStore.ProduceReport();
}

Simulate();
