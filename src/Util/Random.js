function Random(Min, Max){
    return Math.floor(Math.random() * (Max - Min) + Min);
}

export default Random;