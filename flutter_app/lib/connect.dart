// ignore_for_file: prefer_const_constructors, unused_import, non_constant_identifier_names, prefer_const_declarations, deprecated_member_use

import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:flutter_app/home%20page.dart';
import 'package:web3modal_flutter/web3modal_flutter.dart';
import 'package:web3dart/web3dart.dart';
import 'package:http/http.dart'; // Add this import for web3dart

class ConnectPage extends StatefulWidget {
  const ConnectPage({super.key});

  @override
  State<ConnectPage> createState() => _ConnectPageState();
}

class _ConnectPageState extends State<ConnectPage> {
  var CONTRACT_ADDRESS = "0xe8364881dfffd9f854560d287e6f54441db7f572";
  final privateKey = 'YOUR_PRIVATE_KEY'; // Replace with your actual private key
  late W3MService _w3mService;
  late Web3Client ethClient;
  String? walletAddress;

  @override
  void initState() {
    super.initState();
    _initializeWeb3Modal();
    _initializeWeb3Client();
    _getWalletAddress();
  }

  void _initializeWeb3Modal() async {
    W3MChainPresets.chains.putIfAbsent("11155111", () => _sepoliaChain);
    _w3mService = W3MService(
      projectId: '6f427ccb9e72b1453b0e3c76b70a8741',
      metadata: const PairingMetadata(
        name: 'Arabic Dapp Token',
        description: 'send erc20 or peb20 to friends',
        url: 'https://www.walletconnect.com/',
        icons: ['https://walletconnect.com/walletconnect-logo.png'],
        redirect: Redirect(
          native: 'flutter_blockchain_2024://',
          universal: 'https://www.walletconnect.com',
        ),
      ),
    );
    await _w3mService.init();

    // Listen for connection events
    _w3mService.addListener(_onWeb3ModalEvent);
  }

  void _initializeWeb3Client() {
    final apiUrl =
        "https://mainnet.infura.io/v3/YOUR_INFURA_PROJECT_ID"; // Replace with your Infura project ID
    ethClient = Web3Client(apiUrl, Client());
  }

  void _getWalletAddress() async {
    try {
      // Ensure private key is in proper format
      final sanitizedPrivateKey =
          privateKey.startsWith('0x') ? privateKey.substring(2) : privateKey;
      final credentials = EthPrivateKey.fromHex(sanitizedPrivateKey);
      final address = await credentials.extractAddress();
      setState(() {
        walletAddress = address.hex;
      });
      print('Wallet Address: $walletAddress');
      print(
          'Private Key: $privateKey'); // Avoid printing private key in production
    } catch (e) {
      print('Error extracting wallet address: $e');
    }
  }

  void _onWeb3ModalEvent() {
    if (_w3mService.isConnected) {
      // Navigate to home page when connected
      Navigator.of(context).pushReplacement(
        MaterialPageRoute(builder: (context) => HomePage()),
      );
    }
  }

  @override
  void dispose() {
    _w3mService.removeListener(_onWeb3ModalEvent);
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Color.fromARGB(255, 28, 28, 35),
      body: SafeArea(
        child: Padding(
          padding: EdgeInsets.all(20.0),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              Expanded(
                flex: 1,
                child: Image.asset(
                  'assets/thirdweb.png',
                  width: 150,
                  height: 150,
                ),
              ),
              Text(
                "Welcome to",
                style: TextStyle(
                  fontSize: 24,
                  color: Colors.white70,
                  fontWeight: FontWeight.w300,
                ),
                textAlign: TextAlign.center,
              ),
              SizedBox(height: 8),
              Text(
                "Blockchain Crowdfunding",
                style: TextStyle(
                  fontSize: 32,
                  color: Colors.white,
                  fontWeight: FontWeight.bold,
                  letterSpacing: 1.2,
                ),
                textAlign: TextAlign.center,
              ),
              SizedBox(height: 30),
              W3MConnectWalletButton(service: _w3mService),
              SizedBox(height: 30),
              if (walletAddress !=
                  null) // Display wallet address and private key
                Column(
                  children: [
                    Text(
                      'Wallet Address: $walletAddress',
                      style: TextStyle(color: Colors.white),
                    ),
                    Text(
                      'Private Key: $privateKey',
                      style: TextStyle(color: Colors.white),
                    ),
                  ],
                ),
              SizedBox(height: 200),
            ],
          ),
        ),
      ),
    );
  }
}

const _chainId = "11155111";

final _sepoliaChain = W3MChainInfo(
  chainName: 'Sepolia',
  namespace: 'eip155:$_chainId',
  chainId: _chainId,
  tokenName: 'Sepolia ETH',
  rpcUrl: 'https://rpc.sepolia.org/',
  blockExplorer: W3MBlockExplorer(
    name: 'Sepolia Explorer',
    url: 'https://sepolia.etherscan.io/',
  ),
);
