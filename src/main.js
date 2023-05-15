import { Customer } from "./Classes/Customer.js";
import { Video } from "./Classes/Video.js";
function initCustomers() {
    const CustomerNameList = ["Alexander Thompson", "Victoria Anderson", "Benjamin Mitchell", "Olivia Harris", "Christopher Turner", "Sophia Wilson", "Daniel Walker", "Emily Roberts", "William Davis", "Charlotte Evans"];
    let Customers = [];
    for (let i = 0; i < CustomerNameList.length; i++) {
        Customers[i] = new Customer({Name: CustomerNameList[i]});
    }
    return Customers;
}

function initVideos(){
    const Videos = [
        "Horror: Dark Descent",
        "Horror: Whispering Shadows",
        "Horror: Nightmare Manor",
        "Horror: Terror in the Woods",
        "Romance: Eternal Love",
        "Romance: Love in the City",
        "Romance: The Art of Love",
        "Romance: Sunset Serenade",
        "Comedy: Hilarity Unlimited",
        "Comedy: Love and Laughter",
        "Comedy: The Pranksters",
        "Comedy: Chaos in Paradise",
        "Drama: The Broken Path",
        "Drama: The Silent Tears",
        "Drama: Shattered Dreams",
        "Drama: Beyond Borders",
        "New Release: Midnight Chronicles",
        "New Release: Lost in Paradise",
        "New Release: Laugh Out Loud",
        "New Release: Enchanted Hearts",
    ];
    let MovieList = [];
    for (let i = 0; i < Videos.length; i++){
        const [VideoCatagory, VideoName] = Videos[i].split(": ");
        MovieList[i] = (new Video({Name: VideoName, Category: VideoCatagory}));
    }
    return MovieList;
}

const CustomerList = initCustomers();
const VideoList = initVideos();