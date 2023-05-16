const CustomerTypes = {
    "Regular": {
        //[ min, max ]
        Vidoes: [1, 3],
        Nights: [3, 5],
    },
    "Breezy": {
        Videos: [2, 2],
        Nights: [1, 2]
    },
    "Hoarder": {
        Videos: [3, 3],
        Nights: [3, 5]
    }
};

const CustomerNameList = [
    "Alexander Thompson", 
    "Victoria Anderson", 
    "Benjamin Mitchell", 
    "Olivia Harris", 
    "Christopher Turner", 
    "Sophia Wilson", 
    "Daniel Walker", 
    "Emily Roberts", 
    "William Davis", 
    "Charlotte Evans"
];

const VideoNameList = [
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

const CategoryPrices = {
    "New Release": 1,
    "Drama": 2,
    "Comedy": 3,
    "Romance": 4,
    "Horror": 5
};

const StoreRules = {
    "Days": 35
};

export {
    CustomerTypes,
    CustomerNameList,
    VideoNameList,
    CategoryPrices,
    StoreRules,
};