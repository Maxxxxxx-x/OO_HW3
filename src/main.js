import { CustomerNameList, VideoNameList ,CustomerTypes, CategoryPrices, SimulationSettings } from "./config.js";
import CreateCustomer from "./Classes/Customer.js";
import CreateVideo from "./Classes/Video.js";
import Random from "./Util/Random.js";
import { Store } from "./Classes/Store.js";
import chalk from "chalk";

function initCustomers(NStore) {
    let Customers = [];
    const Types = Object.keys(CustomerTypes);
    for (let i = 0; i < CustomerNameList.length; i++) {
        const Tmp = CreateCustomer({
            Type: Types[Random(0, Types.length)],
            Store: NStore
        });
        Customers[i] = new Tmp({
            Name: CustomerNameList[i],
            Store: NStore
        });
    }
    return Customers;
}

function initVideos() {
    let MovieList = {};
    for (let i = 0; i < VideoNameList.length; i++) {
        const [VideoCatagory, VideoName] = VideoNameList[i].split(": ");
        const Tmp = CreateVideo({
            Category: VideoCatagory,
            Price: CategoryPrices[VideoCatagory],
        });
        MovieList[VideoName] = new Tmp({ Name: VideoName });
    }
    return MovieList;
}

function DoReturnPhase(CustomerList, CurrentDay) {
    if (CurrentDay === 1) return;
    console.log("---------------------------");
    console.log("Return Phase");
    for (let i = 0; i < CustomerList.length; i++) {
        const Customer = CustomerList[i];
        Customer.Return(CurrentDay);
    }
}

function DoBusinessPhase(CustomerList, CurrentDay) {
    console.log("---------------------------");
    console.log("Business Phase");
    //change random to DoBorrow
    for (let i = 0; i < CustomerList.length; i++) {
        const Customer = CustomerList[i];
        Customer.Rent(CurrentDay);
    }
}


function Simulate() {
    const VideoList = initVideos();
    const NStore = new Store({ VideoList: VideoList });
    const CustomerList = initCustomers(NStore);
    console.log(chalk.blue.bold(`Starting simulation for ${SimulationSettings.TotalSimulatedDays} days`));
    console.log("================================================");
    for (let CurrentDay = 1; CurrentDay <= SimulationSettings.TotalSimulatedDays; CurrentDay++) {
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
