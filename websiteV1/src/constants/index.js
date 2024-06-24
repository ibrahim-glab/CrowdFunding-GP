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
        disabled: false
    },
    {
        name: 'requests',
        imgUrl: payment,
        link: '/requests',
        disabled: false
    },
    {
        name: 'history',
        imgUrl: withdraw,
        link: '/history',
        disabled: false
    },
    {
        name: 'profile',
        imgUrl: profile,
        link: '/MyCampaigns',
        disabled: false
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

export const contractABI = [{
        "inputs": [],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "anonymous": false,
        "inputs": [{
                "indexed": true,
                "internalType": "address",
                "name": "owner",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "campaign",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "string",
                "name": "title",
                "type": "string"
            },
            {
                "indexed": false,
                "internalType": "string",
                "name": "description",
                "type": "string"
            },
            {
                "indexed": false,
                "internalType": "string",
                "name": "image",
                "type": "string"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "durationInDays",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "goal",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "enum CampaignFactory.CampaignType",
                "name": "campType",
                "type": "uint8"
            },
            {
                "indexed": false,
                "internalType": "bool",
                "name": "verified",
                "type": "bool"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "reqDate",
                "type": "uint256"
            }
        ],
        "name": "CampaignCreated",
        "type": "event"
    },
    {
        "inputs": [{
            "internalType": "address",
            "name": "campaign",
            "type": "address"
        }],
        "name": "contribute",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "anonymous": false,
        "inputs": [{
                "indexed": true,
                "internalType": "address",
                "name": "contributor",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "address",
                "name": "Campaign",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "date",
                "type": "uint256"
            }
        ],
        "name": "ContributionReceived",
        "type": "event"
    },
    {
        "inputs": [{
                "internalType": "string",
                "name": "title",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "description",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "image",
                "type": "string"
            },
            {
                "internalType": "uint256",
                "name": "durationInDays",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "goal",
                "type": "uint256"
            },
            {
                "internalType": "enum CampaignFactory.CampaignType",
                "name": "campType",
                "type": "uint8"
            },
            {
                "internalType": "bool",
                "name": "verified",
                "type": "bool"
            },
            {
                "internalType": "uint256",
                "name": "reqDate",
                "type": "uint256"
            }
        ],
        "name": "createProject",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "admin",
        "outputs": [{
            "internalType": "address",
            "name": "",
            "type": "address"
        }],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getDeployedProjects",
        "outputs": [{
            "internalType": "contract BaseCampaign[]",
            "name": "",
            "type": "address[]"
        }],
        "stateMutability": "view",
        "type": "function"
    }
]

export const BasecontractABI = [{
        "inputs": [{
                "internalType": "address payable",
                "name": "owner",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "durationInDays",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "Goal",
                "type": "uint256"
            },
            {
                "internalType": "address",
                "name": "admin",
                "type": "address"
            },
            {
                "internalType": "bool",
                "name": "verfied",
                "type": "bool"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "anonymous": false,
        "inputs": [{
                "indexed": true,
                "internalType": "address",
                "name": "contributor",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "address",
                "name": "Campaign",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "date",
                "type": "uint256"
            }
        ],
        "name": "ContributionReceived",
        "type": "event"
    },
    {
        "inputs": [],
        "name": "Owner",
        "outputs": [{
            "internalType": "address payable",
            "name": "",
            "type": "address"
        }],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "campaignEndTime",
        "outputs": [{
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
        }],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "campaignStatus",
        "outputs": [{
            "internalType": "enum BaseCampaign.CampaignStatus",
            "name": "",
            "type": "uint8"
        }],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [{
            "internalType": "address",
            "name": "sender",
            "type": "address"
        }],
        "name": "contribute",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "inputs": [{
            "internalType": "address",
            "name": "",
            "type": "address"
        }],
        "name": "contributors",
        "outputs": [{
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
        }],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [{
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
        }],
        "name": "contributorsList",
        "outputs": [{
            "internalType": "address",
            "name": "",
            "type": "address"
        }],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "endCampaign",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "goal",
        "outputs": [{
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
        }],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "setCampaignActive",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "setCampaignDenied",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "totalContributions",
        "outputs": [{
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
        }],
        "stateMutability": "view",
        "type": "function"
    }
]