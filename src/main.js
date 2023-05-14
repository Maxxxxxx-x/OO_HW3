import {Customer} from "./Classes/Customer.js";

function initCustomers(){
    const CustomersNameList = ["Alexander Thompson", "Victoria Anderson", "Benjamin Mitchell", "Olivia Harris", "Christopher Turner", "Sophia Wilson", "Daniel Walker", "Emily Roberts", "William Davis", "Charlotte Evans"];
    const CustomersType = ["Regular", "Breezy", "Hoarders"];
    let Customers = [];
    CustomersNameList.forEach((Name) => {
        const NewCustomer = new Customer(Name, CustomersType[Math.floor(Math.random() * CustomersType.length)]);
        Customers.push(NewCustomer);
    });
    return Customers;
}



const Customers = initCustomers();

Customers.forEach((Customer) => {
    console.log(`${Customer.GetName()} | ${Customer.GetType()}`);
});
