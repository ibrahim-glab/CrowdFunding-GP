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

export const contractABI = [
    {
      "inputs": [],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "Owner",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "campaign",
          "type": "address"
        }
      ],
      "name": "CampaignCreated",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "campaign",
          "type": "address"
        }
      ],
      "name": "Contribute",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "admin",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "name",
          "type": "string"
        },
        {
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
          "internalType": "enum CampaginFactory.CampaignType",
          "name": "campType",
          "type": "uint8"
        },
        {
          "internalType": "bool",
          "name": "verified",
          "type": "bool"
        }
      ],
      "name": "createProject",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "user",
          "type": "address"
        }
      ],
      "name": "deployedProjectsByUser",
      "outputs": [
        {
          "internalType": "contract BaseCampaign[]",
          "name": "",
          "type": "address[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "user",
          "type": "address"
        }
      ],
      "name": "getContributions",
      "outputs": [
        {
          "components": [
            {
              "internalType": "uint256",
              "name": "amount",
              "type": "uint256"
            },
            {
              "internalType": "address",
              "name": "Campaignaddress",
              "type": "address"
            }
          ],
          "internalType": "struct CampaginFactory.Contribution[]",
          "name": "",
          "type": "tuple[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getDeployedProjects",
      "outputs": [
        {
          "internalType": "contract BaseCampaign[]",
          "name": "",
          "type": "address[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
  ]