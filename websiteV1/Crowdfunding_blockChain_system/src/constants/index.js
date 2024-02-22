import { createCampaign, dashboard, logout, payment, profile, withdraw } from '../assets';

export const navlinks = [{
        name: 'dashboard',
        imgUrl: dashboard,
        link: '/',
    },
    {
        name: 'campaign',
        imgUrl: createCampaign,
        link: '/create-campaign',
    },
    {
        name: 'requests',
        imgUrl: payment,
        link: '/requests',
    },
    {
        name: 'history',
        imgUrl: withdraw,
        link: '/history',
    },
    {
        name: 'profile',
        imgUrl: profile,
        link: '/profile',
    },
    {
        name: 'logout',
        imgUrl: logout,
        link: '/',
        disabled: true,
    },
];
export const requestHeader = [
    'Wallet ID', 'Title', 'Request Date', 'Amount', 'Status'
]
export const reqData = [{
        walletID: "0x244112632",
        title: "Building Village",
        date: new Date("January 7, 2021").toLocaleDateString(),
        amount: "$500",
        status: "Pending"
    },
    {
        walletID: "0x244112142",
        title: "Building Village",
        date: new Date("January 12, 2023").toLocaleDateString(),
        amount: "$500",
        status: "Accepted"
    },
    {
        walletID: "0x244112232",
        title: "Building Village",
        date: new Date("March 11, 2023").toLocaleDateString(),
        amount: "$500",
        status: "Pending"
    },
    {
        walletID: "0x244112532",
        title: "Building Village",
        date: new Date("January 7, 2021").toLocaleDateString(),
        amount: "$500",
        status: "Pending"
    },
    {
        walletID: "0x234112532",
        title: "Building Village",
        date: new Date("June 19, 2022").toLocaleDateString(),
        amount: "$500",
        status: "Rejected"
    },
]