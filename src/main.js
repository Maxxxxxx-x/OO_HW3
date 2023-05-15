import {Customer} from "./Classes/Customer.js";

function initCustomers(){
    const CustomerNameList = ["Alexander Thompson", "Victoria Anderson", "Benjamin Mitchell", "Olivia Harris", "Christopher Turner", "Sophia Wilson", "Daniel Walker", "Emily Roberts", "William Davis", "Charlotte Evans"];
    let Customers = [];
    for (let i = 0; i < CustomerNameList.length; i++){
        const NewCustomer = new Customer(CustomerNameList[i]);
        Customers[i] = NewCustomer;
    }
    return Customers;
}



const Customers = initCustomers();

Customers.forEach((Customer) => {
    console.log(Customer.GetName(), Customer.GetType());
});