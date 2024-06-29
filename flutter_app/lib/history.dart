// ignore_for_file: unused_import, prefer_final_fields, prefer_const_constructors, prefer_const_literals_to_create_immutables, use_build_context_synchronously, sort_child_properties_last, use_key_in_widget_constructors, prefer_interpolation_to_compose_strings

import 'package:flutter/material.dart';
import 'package:flutter_app/LoginPage.dart';
import 'package:flutter_app/helper/factory.dart';
import 'package:flutter_app/home%20page.dart';

import 'package:provider/provider.dart';

class History extends StatelessWidget {
  const History({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return _HistoryOfTransaction();
  }
}

class _HistoryOfTransaction extends StatefulWidget {
  @override
  __HistoryOfTransactionState createState() => __HistoryOfTransactionState();
}

class __HistoryOfTransactionState extends State<_HistoryOfTransaction> {
  String _selectedMonth = '';
  String _selectedYear = '';
  String _selectedDay = '';

  Factory _factory = Factory.getInstance();
  List<Map<String, dynamic>> _data = [];
  bool _isLoading = false;
  bool _sortAscending = false; // Set to false to sort by newest first

  @override
  void initState() {
    super.initState();
    _initialize();
  }

  Future<void> _initialize() async {
    setState(() {
      _isLoading = true;
    });

    try {
      _data = await _factory.getDeployedProjects();
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
      body: _isLoading ? _buildLoadingIndicator() : _buildTable(),
    );
  }

  Widget _buildLoadingIndicator() {
    return Center(
      child: Container(
        padding: EdgeInsets.all(16.0),
        child: CircularProgressIndicator(
          valueColor: AlwaysStoppedAnimation<Color>(
            Color.fromARGB(255, 74, 205, 141),
          ),
        ),
      ),
    );
  }

  Widget _buildTable() {
    return SingleChildScrollView(
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
                  'Transactions Table',
                  style: TextStyle(
                    color: Colors.white,
                    fontSize: 20.0,
                    fontWeight: FontWeight.bold,
                  ),
                  overflow: TextOverflow.ellipsis,
                ),
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
          SizedBox(height: 20),
          SingleChildScrollView(
            scrollDirection: Axis.horizontal,
            child: ConstrainedBox(
              constraints: BoxConstraints(
                minWidth: MediaQuery.of(context).size.width,
              ),
              child: Table(
                border: TableBorder.all(
                  color: const Color.fromARGB(0, 253, 239, 239),
                ),
                children: _buildTableRows(),
              ),
            ),
          ),
        ],
      ),
    );
  }

  List<TableRow> _buildTableRows() {
    List<Map<String, dynamic>> filteredData = _data.where((item) {
      // Check if the date matches the selected day, month, and year
      bool matchesDay =
          _selectedDay.isEmpty || item['Date'].split('/')[0] == _selectedDay;
      bool matchesMonth = _selectedMonth.isEmpty ||
          item['Date'].split('/')[1] == _selectedMonth;
      bool matchesYear =
          _selectedYear.isEmpty || item['Date'].split('/')[2] == _selectedYear;
      return matchesDay && matchesMonth && matchesYear;
    }).toList();

    filteredData.sort((a, b) {
      DateTime dateA = _parseDate(a['Date']);
      DateTime dateB = _parseDate(b['Date']);
      return _sortAscending ? dateA.compareTo(dateB) : dateB.compareTo(dateA);
    });

    List<TableRow> rows = [
      TableRow(
        decoration: BoxDecoration(
          color: Color.fromARGB(255, 74, 205, 141),
        ),
        children: [
          TableCell(
            child: Padding(
              padding: EdgeInsets.all(8.0),
              child: Center(
                child: Text(
                  'Campaign Address',
                  style: TextStyle(color: Colors.white),
                  overflow: TextOverflow.ellipsis,
                ),
              ),
            ),
          ),
          TableCell(
            child: InkWell(
              onTap: () {
                setState(() {
                  _sortAscending = !_sortAscending;
                });
              },
              child: Padding(
                padding: EdgeInsets.all(8.0),
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    Text(
                      ' Date',
                      style: TextStyle(color: Colors.white),
                      overflow: TextOverflow.ellipsis,
                    ),
                    Icon(
                      _sortAscending
                          ? Icons.arrow_downward
                          : Icons.arrow_upward,
                      color: Colors.white,
                    ),
                  ],
                ),
              ),
            ),
          ),
          TableCell(
            child: Padding(
              padding: EdgeInsets.all(8.0),
              child: Center(
                child: Text(
                  'Amount',
                  style: TextStyle(color: Colors.white),
                  overflow: TextOverflow.ellipsis,
                ),
              ),
            ),
          ),
        ],
      ),
    ];

    rows.addAll(filteredData.map((item) {
      String amount = item['Amount'].replaceAll('\$', '');
      return TableRow(
        decoration: BoxDecoration(
          color: rows.length % 2 == 0 ? Color(0xFFE0E0E0) : Color(0xFFFAFAFA),
        ),
        children: [
          TableCell(
            child: Padding(
              padding: EdgeInsets.all(10.0),
              child: Text(
                item['ReceivedWallet'],
                textAlign: TextAlign.center,
                overflow: TextOverflow.ellipsis,
              ),
            ),
            verticalAlignment: TableCellVerticalAlignment.middle,
          ),
          TableCell(
            child: Padding(
              padding: EdgeInsets.all(8.0),
              child: Text(
                _formatDateForDisplay(item['Date']),
                textAlign: TextAlign.center,
                overflow: TextOverflow.ellipsis,
              ),
            ),
            verticalAlignment: TableCellVerticalAlignment.middle,
          ),
          TableCell(
            child: Padding(
              padding: EdgeInsets.all(8.0),
              child: Text(
                amount,
                textAlign: TextAlign.center,
                overflow: TextOverflow.ellipsis,
              ),
            ),
            verticalAlignment: TableCellVerticalAlignment.middle,
          ),
        ],
      );
    }));

    return rows;
  }

  DateTime _parseDate(String date) {
    try {
      List<String> dateParts = date.split(' ')[0].split('/');
      List<String> timeParts = date.split(' ')[1].split(':');

      int year = int.parse(dateParts[0]);
      int month = int.parse(dateParts[1]);
      int day = int.parse(dateParts[2]);
      int hour = int.parse(timeParts[0]);
      int minute = int.parse(timeParts[1]);
      int second = int.parse(timeParts[2]);

      return DateTime(year, month, day, hour, minute, second);
    } catch (e) {
      print('Invalid date format: $date');
      return DateTime.now();
    }
  }

  String _formatDateForDisplay(String date) {
    try {
      List<String> dateParts = date.split(' ')[0].split('/');
      int year = int.parse(dateParts[0]);
      int month = int.parse(dateParts[1]);
      int day = int.parse(dateParts[2]);
      return '$year/$month/$day';
    } catch (e) {
      print('Invalid date format: $date');
      return date;
    }
  }
}
