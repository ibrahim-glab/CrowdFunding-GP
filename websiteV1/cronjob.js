import cron from "node-cron";
import { ethers } from "ethers";

const contractABI = [{
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
const contractAddress =
    "0x9d294E95fC6a1a6F00eb829cCAf4b65189625766";

const provider = new ethers.providers.JsonRpcProvider(
    "https://eth-sepolia.g.alchemy.com/v2/59Sffz2x5iWB2LWv6mTA5l16dpQcPJqU");
const contract = new ethers.Contract(contractAddress, contractABI, provider);

let filteredData = [];

const filterCamp = cron.schedule('*/10 * * * * *', async() => {
    try {
        const events = await contract.queryFilter(contract.filters.CampaignCreated(), 0, "latest");
        const now = new Date();
        filteredData = events.filter((ev) => {
            const deadline = ev.args.durationInDays.toNumber();
            const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
            const daysInSeconds = 24 * 60 * 60; // Seconds in a day
            const remainingTimeInSeconds = deadline - currentTime;
            const remainingDays = Math.ceil(remainingTimeInSeconds / daysInSeconds);
            
            return remainingDays > 0;
        })
        console.log(filteredData);
    } catch (error) {
        console.error('Error fetching events:', error);
    }
});

export { filterCamp, filteredData };