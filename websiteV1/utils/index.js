// This file is used to test the components and the application as a whole.
import ocean from "../src/assets/ocean.png"
export const daysLeft = (deadline) => {
    const difference = new Date(deadline).getTime() - Date.now();
    const remainingDays = difference / (1000 * 3600 * 24);

    return remainingDays.toFixed(0);
};

export const calculateBarPercentage = (goal, raisedAmount) => {
    const percentage = Math.round((raisedAmount * 100) / goal);

    return percentage;
};

export const checkIfImage = (url, callback) => {
    const img = new Image();
    img.src = url;

    if (img.complete) callback(true);

    img.onload = () => callback(true);
    img.onerror = () => callback(false);
};
export const dummyData = [{
        owner: "0x93d7797e0b2dAc45b78136BaC17FFad77e820615",
        title: "Dummy Title 1",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        target: "$1000",
        deadline: "2024-03-01",
        amountCollected: "$500",
        image: ocean,
    },
    {
        owner: "0x93d7797e0b2dAc45b78136BaC17FFad77e820615",
        title: "Dummy Title 2",
        description: "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        target: "$2000",
        deadline: "2024-03-15",
        amountCollected: "$1000",
        image: ocean,
    },
    {
        owner: "0x93d7797e0b2dAc45b78136BaC17FFad77e820615",
        title: "Dummy Title 3",
        description: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        target: "$3000",
        deadline: "2024-03-20",
        amountCollected: "$1500",
        image: ocean,
    },
    {
        owner: "0x93d7797e0b2dAc45b78136BaC17FFad77e820615",
        title: "Dummy Title 4",
        description: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
        target: "$4000",
        deadline: "2024-04-01",
        amountCollected: "$2000",
        image: ocean,
    },
    // Add more objects as needed
];