// ignore_for_file: prefer_const_constructors, deprecated_member_use, file_names

import 'package:flutter/material.dart';
import 'package:flutter_app/home%20page.dart';

class Reset extends StatelessWidget {
  const Reset({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Reset Page', style: TextStyle(color: Colors.white)),
        backgroundColor: Color.fromARGB(255, 74, 205, 141),
      ),
      backgroundColor: Color.fromARGB(255, 28, 28, 35), // Change background
      body: SingleChildScrollView(
        child: Center(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              SizedBox(height: 20),
              Image.asset(
                'assets/playstore.png',
                height: 200.0,
                width: 200.0,
              ),
              SizedBox(height: 20),
              Text(
                'Thank You',
                style: TextStyle(fontSize: 20, color: Colors.white),
              ),
              SizedBox(height: 20),
              Text(
                'ID wallet: 0:24435222EX',
                style: TextStyle(fontSize: 16, color: Colors.white),
              ),
              SizedBox(height: 20),
              Container(
                padding: EdgeInsets.all(10),
                decoration: BoxDecoration(
                  color: Color.fromARGB(255, 28, 28, 35), // box color
                  border: Border.all(color: Colors.grey),
                  borderRadius: BorderRadius.circular(10),
                ),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      'Received Wallet: 0:24547575EX\n'
                      'Date: 05/09/2025\n'
                      'Campaign Title: demo',
                      style: TextStyle(color: Colors.white),
                    ),
                    SizedBox(height: 10),
                    DataTable(
                      columns: const <DataColumn>[
                        DataColumn(
                          label: Text(
                            'CampaignTitle',
                            style: TextStyle(
                                fontStyle: FontStyle.italic,
                                color: Colors.white),
                          ),
                        ),
                        DataColumn(
                          label: Text(
                            'Amount',
                            style: TextStyle(
                                fontStyle: FontStyle.italic,
                                color: Colors.white),
                          ),
                        ),
                        DataColumn(
                          label: Text(
                            'Price',
                            style: TextStyle(
                                fontStyle: FontStyle.italic,
                                color: Colors.white),
                          ),
                        ),
                      ],
                      rows: const <DataRow>[
                        DataRow(
                          cells: <DataCell>[
                            DataCell(Text('demo',
                                style: TextStyle(color: Colors.white))),
                            DataCell(Text('\$5000',
                                style: TextStyle(color: Colors.white))),
                            DataCell(Text('\$135',
                                style: TextStyle(color: Colors.white))),
                          ],
                        ),
                      ],
                    ),
                  ],
                ),
              ),
              SizedBox(height: 20),
              ElevatedButton(
                onPressed: () {
                  showDialog(
                    context: context,
                    builder: (BuildContext context) {
                      return AlertDialog(
                        title: Text('Transaction Successful',
                            style: TextStyle(color: Colors.white)),
                        backgroundColor: Color.fromARGB(255, 74, 205, 141),
                        actions: [
                          TextButton(
                            onPressed: () {
                              // Navigate to home page
                              Navigator.push(
                                context,
                                MaterialPageRoute(
                                    builder: (context) => HomePage()),
                              );
                            },
                            child: Text('OK',
                                style: TextStyle(color: Colors.white)),
                          ),
                        ],
                      );
                    },
                  );
                },
                style: ElevatedButton.styleFrom(
                  backgroundColor: Color.fromARGB(255, 74, 205, 141),
                ),
                child: Text('Confirm', style: TextStyle(color: Colors.white)),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
