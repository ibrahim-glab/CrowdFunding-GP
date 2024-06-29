// ignore_for_file: file_names, non_constant_identifier_names

import 'package:web3modal_flutter/web3modal_flutter.dart';

class Campaign {
  EthereumAddress owner;
  EthereumAddress campaign;
  String imageUrl;
  String title;
  String description;
  String subtitle; // Assuming this is equivalent to description
  double raised; // This will be initialized as 0.0
  double goal;
  int daysLeft; // Converted from durationInDays to daysLeft
  String byAddress;
  bool verified;
  double totalContributions;
  int TotalBackers;

  Campaign({
    required this.owner,
    required this.campaign,
    required this.imageUrl,
    required this.title,
    required this.description,
    required this.subtitle,
    required this.raised,
    required this.goal,
    required this.daysLeft,
    required this.byAddress,
    required this.verified,
    required this.TotalBackers,
    required this.totalContributions,
  });
}
