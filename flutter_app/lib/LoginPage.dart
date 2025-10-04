// ignore_for_file: prefer_const_constructors, file_names, use_key_in_widget_constructors, use_build_context_synchronously

import 'package:flutter/material.dart';
import 'package:flutter_app/home%20page.dart';
import 'package:provider/provider.dart';
import 'helper/factory.dart';

class LoginPage extends StatelessWidget {
  final TextEditingController _privateKeyController = TextEditingController();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Wallet Connector'),
        backgroundColor: Color.fromARGB(255, 28, 28, 35),
      ),
      backgroundColor: Color.fromARGB(255, 28, 28, 35),
      body: Center(
        child: SingleChildScrollView(
          padding: const EdgeInsets.all(16.0),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Image.asset(
                'assets/thirdweb.png',
                height: 100,
              ),
              SizedBox(height: 30),
              Text(
                'Connect Your Wallet',
                style: TextStyle(
                  color: Colors.white,
                  fontSize: 24,
                  fontWeight: FontWeight.bold,
                ),
              ),
              SizedBox(height: 20),
              TextField(
                controller: _privateKeyController,
                decoration: InputDecoration(
                  labelText: 'Enter Private Key',
                  labelStyle: TextStyle(color: Colors.white),
                  enabledBorder: OutlineInputBorder(
                    borderSide: BorderSide(color: Colors.white),
                    borderRadius: BorderRadius.circular(10.0),
                  ),
                  focusedBorder: OutlineInputBorder(
                    borderSide: BorderSide(color: Colors.white),
                    borderRadius: BorderRadius.circular(10.0),
                  ),
                  filled: true,
                  fillColor: Color.fromARGB(255, 48, 48, 58),
                ),
                style: TextStyle(color: Colors.white),
                obscureText: true,
              ),
              SizedBox(height: 30),
              ElevatedButton(
                onPressed: () async {
                  String privateKey = _privateKeyController.text;
                  if (privateKey.isNotEmpty) {
                    final factory = Factory.getInstance();

                    // Set the wallet private key
                    await factory.setWalletPrivateKey(privateKey);

                    // Get the wallet balance
                    double balance = await factory.grtbalnced(privateKey);

                    // Check balance and navigate or show toast accordingly
                    if (balance > 0) {
                      // Navigate to home page
                      Navigator.pushReplacement(
                        context,
                        MaterialPageRoute(
                          builder: (context) => HomePage(),
                        ),
                      );
                    } else {
                      // Show toast for invalid or no balance found
                      _showSuccessToast(context, "Invalid or no balance found");
                    }

                    // Check if wallet address is initialized (if needed)
                    await factory.getWalletAddress();
                  }
                },
                style: ElevatedButton.styleFrom(
                  backgroundColor: Color.fromARGB(255, 74, 205, 141),
                  padding: EdgeInsets.symmetric(horizontal: 50, vertical: 15),
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(10.0),
                  ),
                ),
                child: Text(
                  'LOGIN',
                  style: TextStyle(color: Colors.white, fontSize: 18),
                ),
              ),
              SizedBox(height: 30),
              Consumer<Factory>(
                builder: (context, factory, child) {
                  if (!factory.isWalletAddressInitialized) {
                    return Text(
                      factory.errorMessage.isNotEmpty
                          ? factory.errorMessage
                          : 'Please enter a private key',
                      style: TextStyle(
                          color: Color.fromARGB(255, 255, 255, 255),
                          fontSize: 16),
                      textAlign: TextAlign.center,
                    );
                  } else {
                    return Text(
                      'Wallet Address: ${factory.walletAddress.hex}',
                      style: TextStyle(color: Colors.white, fontSize: 16),
                      textAlign: TextAlign.center,
                    );
                  }
                },
              ),
              SizedBox(height: 320),
            ],
          ),
        ),
      ),
    );
  }
}

void _showSuccessToast(BuildContext context, String message) {
  ScaffoldMessenger.of(context).showSnackBar(
    SnackBar(
      content: Row(
        children: [
          Icon(
            message.startsWith("Transaction successful")
                ? Icons.check_circle
                : Icons.error,
            color: Colors.white,
          ),
          SizedBox(width: 8),
          Expanded(child: Text(message)),
        ],
      ),
      backgroundColor: message.startsWith("Transaction successful")
          ? Colors.green
          : Colors.red,
      duration: Duration(seconds: 4),
    ),
  );
}
