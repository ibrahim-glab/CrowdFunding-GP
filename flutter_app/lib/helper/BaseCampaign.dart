// ignore_for_file: non_constant_identifier_names, file_names

import 'package:web3modal_flutter/web3modal_flutter.dart';

class BaseCampaign {
  EthereumAddress ReceivedWallet;
  double Amount;
  String Date;
  String CampaignTitle;

  BaseCampaign({
    required this.ReceivedWallet,
    required this.Amount,
    required this.Date,
    required this.CampaignTitle,
  });
}

/*enum CampaignStatus {
  Active,
  Successful,
  Pending,
  Failed,
  Denied,
}*/
