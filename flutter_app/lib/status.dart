// ignore_for_file: unused_import, use_build_context_synchronously, prefer_interpolation_to_compose_strings

import 'package:flutter/material.dart';
import 'package:flutter_app/LoginPage.dart';
import 'package:flutter_app/helper/Campaign.dart';
import 'package:flutter_app/helper/factory.dart';
import 'package:flutter_app/helper/moredetails.dart';
import 'package:flutter_app/home page.dart';
import 'package:http/http.dart';
import 'dart:io';

import 'package:provider/provider.dart';

// ignore_for_file: use_key_in_widget_constructors, prefer_const_constructors, prefer_final_fields, library_private_types_in_public_api, unnecessary_string_interpolations, non_constant_identifier_names

class RequestStat extends StatefulWidget {
  const RequestStat({Key? key}) : super(key: key);

  @override
  _RequestStatState createState() => _RequestStatState();
}

class _RequestStatState extends State<RequestStat> {
  String _selectedStatus = 'All';
  DataRepository a = DataRepository();
  bool _sortAscending = false; // Default to descending order
  Factory _factory = Factory.getInstance();
  bool _isLoading = false; // Track loading state

  @override
  void initState() {
    super.initState();
    _initialize();
  }

//////////////////////////////////////////////////////////////
  // Future<void> loadAllCampaignData() async {
  //   Stream<List<Campaign>> campaignsStream = _factory.getCampaignsCreated();

  //   await for (List<Campaign> campaigns in campaignsStream) {
  //     for (Campaign campaignDetails in campaigns) {
  //       moredetails details =
  //           await _factory.getMoreDetailsOfCampaign(campaignDetails.campaign);

  //       // Update campaign's raised amount
  //       campaignDetails.raised = details.totalContributions;

  //       // Determine and set campaign status
  //       int campaignStatus = details.status;

  //       if (campaignDetails.raised >= campaignDetails.goal) {
  //         campaignStatus = 1; // Set status to 1 if raised amount equals goal
  //       } else if (campaignDetails.daysLeft < 0 &&
  //           campaignDetails.raised < campaignDetails.goal) {
  //         campaignStatus =
  //             3; // Set status to 3 if daysLeft < 0 and raised < goal
  //       }

  //       // Print campaign details
  //       print("Campaign Title: ${campaignDetails.title}");
  //       print("Raised: ${campaignDetails.raised} ETH");
  //       print("Goal: ${campaignDetails.goal} ETH");
  //       print("Status: $campaignStatus");
  //       print("Goal: ${campaignDetails.daysLeft} days");

  //     }
  //   }
  // }

//////////////////////////////////////////////////////////////
  Future<void> _initialize() async {
    setState(() {
      _isLoading = true;
    });
    // await loadAllCampaignData();
    try {
      a.data = await _factory.getMyCamapinRequests();
      setState(() {});
    } catch (e) {
      print('Error fetching data: $e');
    } finally {
      setState(() {
        _isLoading = false;
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Color.fromARGB(255, 28, 28, 35),
      drawer: SideMenu(),
      appBar: AppBar(
        backgroundColor: const Color.fromARGB(255, 74, 205, 141),
        title: Row(
          children: [
            Image.asset(
              'assets/playstore.png',
              height: 90.0,
              width: 40.0,
              color: Color.fromARGB(255, 28, 28, 35),
              colorBlendMode: BlendMode.srcIn,
            ),
            SizedBox(width: 8.0),
            Expanded(
              child: Text(
                'Fund Me',
                style: TextStyle(
                  fontSize: 34.0,
                  fontWeight: FontWeight.bold,
                  color: Color.fromARGB(255, 255, 255, 255),
                ),
              ),
            ),
          ],
        ),
        actions: [
          IconButton(
            icon: Icon(Icons.exit_to_app),
            onPressed: () async {
              final factory = Provider.of<Factory>(context, listen: false);
              await factory.logout();

              Navigator.pushAndRemoveUntil(
                context,
                MaterialPageRoute(builder: (context) => LoginPage()),
                (Route<dynamic> route) => false,
              );
            },
          ),
        ],
      ),
      body: _isLoading ? _buildLoadingIndicator() : _buildContent(),
    );
  }

  Widget _buildLoadingIndicator() {
    return Center(
      child: CircularProgressIndicator(
        valueColor: AlwaysStoppedAnimation<Color>(
          Color.fromARGB(255, 74, 205, 141),
        ),
      ),
    );
  }

  Widget _buildContent() {
    return Padding(
      padding: const EdgeInsets.all(16.0),
      child: Column(
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Container(
                padding: EdgeInsets.symmetric(vertical: 8, horizontal: 12),
                decoration: BoxDecoration(
                  color: Color.fromARGB(255, 74, 205, 141),
                  borderRadius: BorderRadius.circular(8),
                ),
                child: Text(
                  'Campaigns Status',
                  style: TextStyle(
                    color: Colors.white,
                    fontSize: 20.0,
                    fontWeight: FontWeight.bold,
                  ),
                  overflow: TextOverflow.ellipsis,
                ),
              ),
              Row(
                children: [
                  IconButton(
                    icon: Icon(
                      Icons.filter_list,
                      color: Color.fromARGB(255, 74, 205, 141),
                    ),
                    onPressed: () {
                      showFilterOptions(context);
                    },
                  ),
                  IconButton(
                    icon: Icon(
                      Icons.refresh,
                      color: Color.fromARGB(255, 74, 205, 141),
                    ),
                    onPressed: () {
                      setState(() {
                        _initialize();
                      });
                    },
                  ),
                ],
              ),
            ],
          ),
          SizedBox(height: 20),
          Expanded(
            child: SingleChildScrollView(
              scrollDirection: Axis.horizontal,
              child: ConstrainedBox(
                constraints:
                    BoxConstraints(minWidth: MediaQuery.of(context).size.width),
                child: SingleChildScrollView(
                  scrollDirection: Axis.vertical,
                  child: IntrinsicWidth(
                    child: Table(
                      defaultVerticalAlignment:
                          TableCellVerticalAlignment.middle,
                      border: TableBorder.all(color: Colors.transparent),
                      children: _buildTableRows(),
                    ),
                  ),
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }

  List<TableRow> _buildTableRows() {
    List<Map<String, dynamic>> filteredData = _selectedStatus == 'All'
        ? a.data
        : a.data.where((item) => item['status'] == _selectedStatus).toList();

    List<Map<String, dynamic>> sortedData = filteredData.toList();
    sortedData.sort((a, b) {
      DateTime dateA = DateTime.parse(_reverseDateFormat(a['date']));
      DateTime dateB = DateTime.parse(_reverseDateFormat(b['date']));
      return _sortAscending ? dateA.compareTo(dateB) : dateB.compareTo(dateA);
    });

    List<TableRow> rows = [
      TableRow(
        decoration: BoxDecoration(
          color: Color.fromARGB(255, 74, 205, 141),
        ),
        children: [
          _buildTableCell('Wallet ID', true),
          _buildTableCell('Title', true),
          _buildTableCellWithSort(' Date'),
          _buildTableCell('Amount', true),
          _buildTableCell('Status', true),
        ],
      ),
    ];

    rows.addAll(sortedData.map((item) {
      return TableRow(
        decoration: BoxDecoration(
          color: rows.length % 2 == 0 ? Colors.white : Colors.grey[300],
        ),
        children: [
          _buildTableCell(
              '${item['id'].substring(0, 20)}...${item['id'].substring(item['id'].length)}'),
          _buildTableCell(item['projectName']),
          _buildTableCell(item['displayDate']),
          _buildTableCell(item['amount']),
          _buildTableCell(item['status']),
        ],
      );
    }));

    return rows;
  }

  Widget _buildTableCell(String text, [bool isHeader = false]) {
    return TableCell(
      verticalAlignment: TableCellVerticalAlignment.middle,
      child: Center(
        child: Padding(
          padding: EdgeInsets.symmetric(vertical: 18.0, horizontal: 1.0),
          child: Text(
            text,
            style: TextStyle(
              color:
                  isHeader ? Colors.white : const Color.fromARGB(255, 4, 4, 4),
              fontWeight: isHeader ? FontWeight.bold : FontWeight.normal,
              fontSize: 12.0, // Smaller font size for better fit
              overflow: TextOverflow.ellipsis,
            ),
          ),
        ),
      ),
    );
  }

  Widget _buildTableCellWithSort(String text) {
    return TableCell(
      verticalAlignment: TableCellVerticalAlignment.middle,
      child: InkWell(
        onTap: () {
          setState(() {
            _sortAscending = !_sortAscending;
          });
        },
        child: Row(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Text(
              text,
              style: TextStyle(
                color: Colors.white,
                fontWeight: FontWeight.bold,
                fontSize: 12.0, // Smaller font size for better fit
              ),
              overflow: TextOverflow.ellipsis,
            ),
            Icon(
              _sortAscending ? Icons.arrow_upward : Icons.arrow_downward,
              color: Colors.white,
              size: 16.0, // Smaller icon size for better fit
            ),
          ],
        ),
      ),
    );
  }

  void showFilterOptions(BuildContext context) {
    final RenderBox button = context.findRenderObject() as RenderBox;
    final Offset offset = Offset(10, 0);
    final RelativeRect position = RelativeRect.fromRect(
      Rect.fromPoints(
        button.localToGlobal(Offset.zero,
            ancestor:
                Overlay.of(context).context.findRenderObject() as RenderBox),
        button.localToGlobal(button.size.bottomRight(Offset.zero) + offset,
            ancestor:
                Overlay.of(context).context.findRenderObject() as RenderBox),
      ),
      Offset.zero & button.size,
    );

    showMenu<String>(
      context: context,
      position: position,
      color: Color.fromARGB(255, 28, 28, 35),
      items: <PopupMenuEntry<String>>[
        PopupMenuItem<String>(
          value: 'All',
          child: Text(
            'All',
            style: TextStyle(color: Colors.white),
          ),
        ),
        PopupMenuItem<String>(
          value: 'Active',
          child: Text(
            'Active',
            style: TextStyle(color: Colors.white),
          ),
        ),
        PopupMenuItem<String>(
          value: 'Successful',
          child: Text(
            'Successful',
            style: TextStyle(color: Colors.white),
          ),
        ),
        PopupMenuItem<String>(
          value: 'Pending',
          child: Text(
            'Pending',
            style: TextStyle(color: Colors.white),
          ),
        ),
        PopupMenuItem<String>(
          value: 'Failed',
          child: Text(
            'Failed',
            style: TextStyle(color: Colors.white),
          ),
        ),
        PopupMenuItem<String>(
          value: 'Denied',
          child: Text(
            'Denied',
            style: TextStyle(color: Colors.white),
          ),
        ),
      ],
    ).then((String? value) {
      if (value != null) {
        setState(() {
          _selectedStatus = value;
        });
      }
    });
  }

  String _reverseDateFormat(String date) {
    List<String> parts = date.split('/');
    return '${parts[0]}-${parts[1].padLeft(2, '0')}-${parts[2].split(' ')[0].padLeft(2, '0')} ${parts[2].split(' ')[1]}';
  }
}

class DataRepository {
  List<Map<String, dynamic>> data = [];
}
