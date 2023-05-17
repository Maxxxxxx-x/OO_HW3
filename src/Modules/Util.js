import { randomUUID } from "node:crypto";

function Random(Min, Max){
    return Math.floor(Math.random() * (Max - Min) + Min);
}



export { Random, randomUUID };