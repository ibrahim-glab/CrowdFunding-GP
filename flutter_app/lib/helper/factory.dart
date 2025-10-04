// ignore_for_file: prefer_const_constructors, deprecated_member_use, non_constant_identifier_names, unused_local_variable, unused_field, depend_on_referenced_packages, avoid_print, unused_import, prefer_collection_literals, unnecessary_new, unnecessary_string_escapes, use_rethrow_when_possible

import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter/widgets.dart';
import 'package:flutter_app/helper/BaseCampaign.dart';
import 'package:flutter_app/helper/Campaign.dart';
import 'package:flutter_app/helper/moredetails.dart';
import 'package:intl/intl.dart';
import 'package:web3dart/web3dart.dart';
import 'package:http/http.dart';
import 'package:web3modal_flutter/web3modal_flutter.dart';

class Factory extends ChangeNotifier {
  static final Factory _instance = Factory();

  final String _networkURL =
      "https://sepolia.infura.io/v3/78bc8c0cb4b046eabff62045863089e7"; //"https://eth-sepolia.g.alchemy.com/v2/59Sffz2x5iWB2LWv6mTA5l16dpQcPJqU"
  final String _networkwss =
      "wss://sepolia.infura.io/ws/v3/78bc8c0cb4b046eabff62045863089e7";
  final String sepolia_contractAddress =
      "0x676866a521879b813b050Ba54bcdCa19f8D7A829";
  //"0x94dF3Bc46686B566262812Bc5264Ec5A78DeE6eE";

  String walletPrivateKey = "";
  String errorMessage = "";
  bool isWalletAddressInitialized = false;

  late Web3Client _web3client;
  late Credentials _credentials;
  late EthereumAddress walletAddress;
  late EthereumAddress _contractaddress;
  late DeployedContract _contract_CampaginFactory;
  late DeployedContract _contract_BaseCampagin;

  String title = '';
  String description = '';
  String image = '';
  int durationInDays = 0;
  BigInt goal = BigInt.zero;
  bool verified = false;

  Factory() {
    _web3client = Web3Client(_networkURL, Client());
    _contractaddress = EthereumAddress.fromHex(sepolia_contractAddress);
    _initializeAbi();
  }

  static Factory getInstance() {
    return _instance;
  }

  int getUnixTimestamp(DateTime date) {
    return date.millisecondsSinceEpoch ~/ 1000;
  }

  DateTime getDateTimeFromUnix(int unixTimestamp) {
    return DateTime.fromMillisecondsSinceEpoch(unixTimestamp * 1000);
  }

  Future<void> _initializeAbi() async {
    String apicampainfactory =
        await rootBundle.loadString("src/abis/campainfactory.json");

    var jsonapi1 = jsonDecode(apicampainfactory);

    _contract_CampaginFactory = DeployedContract(
      ContractAbi.fromJson(jsonEncode(jsonapi1), "CampaginFactory"),
      _contractaddress,
    );
  }

  Future<String> setWalletPrivateKey(String privateKey) async {
    String s = "";
    try {
      walletPrivateKey = privateKey;
      print(privateKey);
      _credentials =
          await _web3client.credentialsFromPrivateKey(walletPrivateKey);

      s = privateKey;
    } catch (e) {
      s = "Error";
    }

    notifyListeners();
    return s;
  }

  Future<void> getWalletAddress() async {
    try {
      walletAddress = await _credentials.extractAddress();
      errorMessage = "";
      isWalletAddressInitialized = true;
      notifyListeners();
    } catch (e) {
      errorMessage = "Invalid Private Key";
      isWalletAddressInitialized = false;
      notifyListeners();
    }
  }
//

  Future<double> grtbalnced(String privateKey) async {
    double balance = 0.0;
    try {
      walletPrivateKey = privateKey;
      _credentials =
          await _web3client.credentialsFromPrivateKey(walletPrivateKey);
      EthereumAddress address = _credentials.address;

      // Get wallet balance
      EtherAmount etherAmount = await _web3client.getBalance(address);
      balance = etherAmount.getValueInUnit(EtherUnit.ether);

      // Print wallet balance
      print('Wallet balance: $balance ETH');
    } catch (e) {
      print("Error: $e"); // Log the error
    }

    notifyListeners();
    return balance;
  }

  // New logout method
  Future<void> logout() async {
    walletPrivateKey = "";
    walletAddress =
        EthereumAddress.fromHex("0x0000000000000000000000000000000000000000");
    errorMessage = "";
    isWalletAddressInitialized = false;
    notifyListeners();
  }

// ABIS on Blockchain:

  Future<void> createCampaign(String title, String description, String image,
      DateTime durationInDays, BigInt goal, int campType, bool verified) async {
    final func = _contract_CampaginFactory.function('createProject');
    try {
      DateTime now = DateTime.now();

      // Get the UNIX timestamp (milliseconds since epoch)
      int unixTimestampDateReq = getUnixTimestamp(now);

      // int unixTimestamp = durationInDays.millisecondsSinceEpoch;
      int unixTimestamp = getUnixTimestamp(durationInDays);
      await _web3client.sendTransaction(
        _credentials,
        Transaction.callContract(
          contract: _contract_CampaginFactory,
          function: func,
          parameters: [
            title,
            description,
            image,
            BigInt.from(unixTimestamp),
            goal,
            BigInt.from(campType),
            verified,
            BigInt.from(unixTimestampDateReq)
          ],
        ),
        chainId: 11155111,
      );
      print("Transaction successful");
    } catch (e) {
      print("Error creating campaign: $e");
      throw Exception("Failed to create campaign");
    }
  }

  Stream<List<Campaign>> getCampaignsCreated() async* {
    final event1 = _contract_CampaginFactory.event('CampaignCreated');

    FilterOptions options = FilterOptions(
      address: _contract_CampaginFactory.address,
      fromBlock: BlockNum.exact(0),
      toBlock: BlockNum.current(),
    );

    var eventStream = await _web3client.getLogs(options);

    List<Campaign> campaigns = [];

    const int batchSize = 10; // Adjust this value as needed
    const Duration delayBetweenBatches = Duration(seconds: 1);

    for (int i = 0; i < eventStream.length; i += batchSize) {
      List<Future> futures = [];

      for (int j = i; j < i + batchSize && j < eventStream.length; j++) {
        var event = eventStream[j];

        futures.add(() async {
          if (event.topics == null || event.data == null) {
            return;
          }

          // Skip processing if event.topics has a length of 2
          if (event.topics!.length == 2) {
            return;
          }

          try {
            final decoded = event1.decodeResults(event.topics!, event.data!);
            final owner = decoded[0] as EthereumAddress;
            final campaignAddress = decoded[1] as EthereumAddress;
            final title = decoded[2] as String;
            final description = decoded[3] as String;
            final image = decoded[4] as String;
            final durationInDays = decoded[5] as BigInt;
            final goal = decoded[6] as BigInt;
            final campType = decoded[7] as BigInt;
            final verified = decoded[8] as bool;

            DateTime now = DateTime.now();
            int currentTime =
                now.millisecondsSinceEpoch ~/ 1000; // Current time in seconds
            int daysInSeconds = 24 * 60 * 60; // Seconds in a day
            int remainingTimeInSeconds = durationInDays.toInt() - currentTime;

            int daysLeft = (remainingTimeInSeconds / daysInSeconds).ceil();

            moredetails a =
                moredetails(TotalBackers: 0, totalContributions: 0, status: 0);
            campaigns.add(
              Campaign(
                imageUrl: image,
                title: title,
                subtitle: description,
                raised: a
                    .totalContributions, // Initialize with 0, you may update it later with actual data
                goal: goal.toDouble() / 1000000000000000000,
                daysLeft: daysLeft,
                byAddress: owner.hex,
                verified: verified,
                description: description,
                owner: owner,
                campaign: campaignAddress,
                TotalBackers: a.TotalBackers,
                totalContributions: a.totalContributions,
              ),
            );
          } catch (e) {
            print('Error decoding event: $e');
          }
        }());
      }

      await Future.wait(futures);
      yield List<Campaign>.from(campaigns);

      // Introduce a delay between batches
      await Future.delayed(delayBetweenBatches);
    }
  }

  Future<moredetails> getMoreDetailsOfCampaign(
      EthereumAddress campaignAddress) async {
    // Load BaseCampaign contract ABI
    String apiBaseCampaign =
        await rootBundle.loadString("src/abis/basecampain.json");
    var jsonApi = jsonDecode(apiBaseCampaign);

    final baseCampaign = DeployedContract(
      ContractAbi.fromJson(jsonEncode(jsonApi), "BaseCampaign"),
      campaignAddress,
    );

    // Fetch campaign attributes (add other attributes as needed)
    final ownerFunction = baseCampaign.function("Owner");
    final goalFunction = baseCampaign.function("goal");
    final totalContributionsFunction =
        baseCampaign.function("totalContributions");
    final campaignStatusFunction = baseCampaign.function("campaignStatus");

    try {
      final event1 = baseCampaign.event('ContributionReceived');

      FilterOptions options = FilterOptions(
        address: baseCampaign.address,
        fromBlock: BlockNum.exact(0),
        toBlock: BlockNum.current(),
      );

      int TotalBackers = 0;
      var eventStream = await _web3client.getLogs(options);

      var identifier = new Map();
      List<dynamic> campaignStatus = await _web3client.call(
        contract: baseCampaign,
        function: campaignStatusFunction,
        params: [],
      );
      int status = (campaignStatus[0] as BigInt).toInt();

      for (var event in eventStream) {
        if (event.topics == null || event.data == null) {
          continue;
        }

        final decoded = event1.decodeResults(event.topics!, event.data!);
        final contributor = decoded[0] as EthereumAddress;

        identifier[contributor] = 1;
      }

      TotalBackers = identifier.length;

      List<dynamic> totalContributions = await _web3client.call(
        contract: baseCampaign,
        function: totalContributionsFunction,
        params: [],
      );

      moredetails a = moredetails(
          totalContributions: (totalContributions[0] as BigInt).toDouble() /
              1000000000000000000,
          TotalBackers: TotalBackers,
          status: status);

      return a;
    } catch (e) {
      print("Error: $e");
    }
    return moredetails(totalContributions: 0, TotalBackers: 0, status: 1);
  }

  Future<String> funding(EthereumAddress campaign, int amount) async {
    try {
      final address = _credentials.address;
      final balance = await _web3client.getBalance(address);
      if (amount > balance.getInWei.toInt()) {
        return "Your balance is not enough";
      }

      final contributeFunction =
          _contract_CampaginFactory.function('contribute');

      var transaction = Transaction.callContract(
        contract: _contract_CampaginFactory,
        function: contributeFunction,
        parameters: [campaign],
        value: EtherAmount.inWei(
            BigInt.from(amount)), // This includes the amount to be sent
        from: _credentials.address,
      );

      var transactionId = await _web3client.sendTransaction(
        _credentials,
        transaction,
        chainId:
            11155111, // Use the appropriate chain ID for your network (1 for mainnet)
      );

      return "Transaction Id: $transactionId";
    } catch (e) {
      return 'Error on funding function : $e';
    }
  }

  Future<List<Map<String, dynamic>>> getDeployedProjects() async {
    final getDeployedProjects =
        _contract_CampaginFactory.function("getDeployedProjects");

    List<Map<String, dynamic>> B = [];
    EthereumAddress publickey = await _credentials.extractAddress();
    Set<String> processedEvents = {}; // To track processed events

    int retries = 3; // Number of retries
    const initialDelay = Duration(seconds: 1); // Initial retry delay

    while (retries > 0) {
      try {
        // Call getDeployedProjects to get list of deployed campaigns
        final deployedCampaigns = await _web3client.call(
          contract: _contract_CampaginFactory,
          function: getDeployedProjects,
          params: [],
        );

        // Iterate through each deployed campaign address
        for (var campaignAdd in deployedCampaigns[0]) {
          String apiBaseCampaign =
              await rootBundle.loadString("src/abis/basecampain.json");
          var jsonApi = jsonDecode(apiBaseCampaign);

          final baseCampaign = DeployedContract(
            ContractAbi.fromJson(jsonEncode(jsonApi), "BaseCampaign"),
            campaignAdd,
          );

          final event1 = baseCampaign.event('ContributionReceived');

          FilterOptions options = FilterOptions(
            address: baseCampaign.address,
            fromBlock: BlockNum.exact(0),
            toBlock: BlockNum.current(),
          );

          var eventStream = await _web3client.getLogs(options);

          for (var event in eventStream) {
            if (event.topics == null || event.data == null) {
              continue;
            }

            final decoded = event1.decodeResults(event.topics!, event.data!);
            final contributor = decoded[0] as EthereumAddress;
            final eventId = event.logIndex.toString() +
                (event.transactionHash ??
                    ''); // Create a unique ID for the event

            if (publickey == contributor &&
                !processedEvents.contains(eventId)) {
              processedEvents.add(eventId); // Mark this event as processed

              double amount =
                  (decoded[2] as BigInt).toDouble() / 1000000000000000000;
              if (amount != 0) {
                DateTime date = DateTime.fromMillisecondsSinceEpoch(
                    (decoded[3] as BigInt).toInt() * 1000);

                // Format the DateTime object into a string with desired format
                String formattedDate =
                    DateFormat('yyyy/MM/dd HH:mm:ss').format(date);

                B.add({
                  'ReceivedWallet': (decoded[1] as EthereumAddress).toString(),
                  'Amount': '$amount ETH',
                  'Date': formattedDate,
                  'CampaignTitle': '3la alla'
                });

                print((decoded[1] as EthereumAddress).toString());
                print('$amount ETH');
                print(formattedDate);
                print("-------------------------------");
              }
            }
          }
        }

        // If successful, break out of retry loop
        break;
      } catch (e) {
        // Handle exceptions here, e.g., log the error
        print('Error fetching data: $e');

        // Decrement retries and apply exponential backoff
        retries--;
        if (retries > 0) {
          await Future.delayed(initialDelay * (4 - retries));
        } else {
          // No more retries, propagate the error or handle it accordingly
          throw e;
        }
      }
    }

    return B;
  }

  Future<List<Map<String, dynamic>>> getMyCamapinRequests() async {
    final getDeployedProjects =
        _contract_CampaginFactory.function("getDeployedProjects");

    // Call getDeployedProjects to get list of deployed campaigns
    final deployedCampaigns = await _web3client.call(
      contract: _contract_CampaginFactory,
      function: getDeployedProjects,
      params: [],
    );

    List<Map<String, dynamic>> B = [];

    EthereumAddress publickey = await _credentials.extractAddress();

    String apiBaseCampaign =
        await rootBundle.loadString("src/abis/basecampain.json");
    var jsonApi = jsonDecode(apiBaseCampaign);

    // Iterate through each deployed campaign address
    for (var campaignAdd in deployedCampaigns[0]) {
      final baseCampaign = DeployedContract(
        ContractAbi.fromJson(jsonEncode(jsonApi), "BaseCampaign"),
        campaignAdd,
      );

      // Fetch campaign attributes (add other attributes as needed).
      final ownerFunction = baseCampaign.function("Owner");
      final AmountFunction = baseCampaign.function("goal");
      final reqDateFunction = baseCampaign.function("reqDate");
      final TitleFunction = baseCampaign.function("Title");
      final campaignStatusFunction = baseCampaign.function("campaignStatus");

      List<dynamic> owner = await _web3client.call(
        contract: baseCampaign,
        function: ownerFunction,
        params: [],
      );

      if (owner[0] != publickey) {
        continue;
      }

      List<dynamic> amount = await _web3client.call(
        contract: baseCampaign,
        function: AmountFunction,
        params: [],
      );

      /* List<dynamic> Title = await _web3client.call(
        contract: baseCampaign,
        function: TitleFunction,
        params: [],
      );*/

      List<dynamic> campaignStatus = await _web3client.call(
        contract: baseCampaign,
        function: campaignStatusFunction,
        params: [],
      );
      int status = (campaignStatus[0] as BigInt).toInt();

      List<dynamic> title = await _web3client.call(
        contract: baseCampaign,
        function: TitleFunction,
        params: [],
      );

      List<dynamic> reqDate = await _web3client.call(
        contract: baseCampaign,
        function: reqDateFunction,
        params: [],
      );

      int Date = (reqDate[0] as BigInt).toInt();
      DateTime dateTime = getDateTimeFromUnix(Date);

      String s = '';
      //int status =(campaignStatus[0] as BigInt).toInt();
      if (status == 0) {
        s = 'Active';
      } else if (status == 1) {
        s = 'Successful';
      } else if (status == 2) {
        s = 'Pending';
      } else if (status == 3) {
        s = 'Failed';
      } else if (status == 4) {
        s = 'Denied';
      }

      B.add({
        'id': campaignAdd.toString(),
        'projectName': title[0] as String,
        'amount':
            '${(amount[0] as BigInt).toDouble() / 1000000000000000000}\ETH',
        'date': DateFormat('yyyy/MM/dd HH:mm:ss').format(dateTime),
        'displayDate': DateFormat('yyyy/MM/dd').format(dateTime),
        'status': s
      });

      //print(Title[0].toString());
      print(campaignAdd.toString());
      print(title[0] as String);
      print('${(amount[0] as BigInt).toDouble() / 1000000000000000000}\ETH');
      print(DateFormat('yyyy/MM/dd HH:mm:ss').format(dateTime)); //'20/9/2025'
      print(s);
      print(status.runtimeType);
      print("-------------------------------");
    }

    return B;
  }

//////////////////////////////////////////////////////
}
