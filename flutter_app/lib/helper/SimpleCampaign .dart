// ignore_for_file: unused_import, file_names

import 'package:intl/intl.dart';

class CampaignDetails {
  String title;
  double totalContributions;
  double goal;
  int status;
  int daysLeft;

  CampaignDetails({
    required this.title,
    required this.totalContributions,
    required this.goal,
    required this.status,
    required this.daysLeft,
  });
}
