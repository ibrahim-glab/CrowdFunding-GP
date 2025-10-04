// ignore_for_file: prefer_const_constructors, sort_child_properties_last, use_key_in_widget_constructors, library_private_types_in_public_api, file_names, deprecated_member_use, unused_label, prefer_interpolation_to_compose_strings, use_build_context_synchronously

import 'dart:io';

import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_app/LoginPage.dart';
import 'package:flutter_app/home%20page.dart';
import 'package:flutter_app/pinata.dart';
import 'package:image_picker/image_picker.dart';
import 'package:flutter_app/helper/factory.dart';
import 'package:provider/provider.dart';

class CreateNewCampaign extends StatefulWidget {
  @override
  _CreateNewCampaignState createState() => _CreateNewCampaignState();
}

class _CreateNewCampaignState extends State<CreateNewCampaign> {
  String selectedOption = '';
  DateTime? selectedDate;
  late DateTime durationInDays;
  bool verified = false;
  bool _isLoading = false;
  final _formKey = GlobalKey<FormState>();
  String ipfsHash = "";
  final TextEditingController _title = TextEditingController();
  final TextEditingController _decoration = TextEditingController();
  final TextEditingController _goal = TextEditingController();
  File? _image;
  final PinataUploader _uploader = PinataUploader();
  Future<void> _pickImage() async {
    final picker = ImagePicker();
    final pickedFile = await picker.pickImage(source: ImageSource.gallery);

    if (pickedFile != null) {
      File imageFile = File(pickedFile.path);

      if (await imageFile.length() > 5 * 1024 * 1024) {
        showDialog(
          context: context,
          builder: (context) => AlertDialog(
            backgroundColor: Color.fromARGB(255, 28, 28, 35),
            title: Text(
              'Image size limit exceeded',
              style: TextStyle(color: Colors.white),
            ),
            content: Text(
              'Please select an image smaller than 5 MB.',
              style: TextStyle(color: Colors.white),
            ),
            actions: <Widget>[
              TextButton(
                child: Text(
                  'OK',
                  style: TextStyle(color: Color.fromARGB(255, 74, 205, 141)),
                ),
                onPressed: () {
                  Navigator.of(context).pop();
                },
              ),
            ],
          ),
        );

        return;
      }

      setState(() {
        _image = imageFile;
      });

      _uploadImage(); // Optionally, you can call your upload function here
    }
  }

  Future<void> _uploadImage() async {
    if (_image != null) {
      try {
        ipfsHash = (await _uploader.uploadImage(_image!))!;
        print('Image uploaded successfully');
      } catch (e) {
        print('Failed to upload image: $e');
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
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
      backgroundColor: Color.fromARGB(255, 28, 28, 35),
      body: Stack(
        children: [
          SingleChildScrollView(
            padding: const EdgeInsets.all(16.0),
            child: Form(
              key: _formKey,
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.stretch,
                children: <Widget>[
                  SizedBox(height: 10),
                  TextFormField(
                    controller: _title,
                    style: TextStyle(color: Colors.white),
                    decoration: InputDecoration(
                      labelText: 'Title',
                      hintText: 'Enter Campaign Title',
                      labelStyle: TextStyle(color: Colors.white),
                      hintStyle: TextStyle(color: Colors.grey),
                      floatingLabelBehavior: FloatingLabelBehavior.always,
                    ),
                    validator: (value) {
                      if (value == null || value.isEmpty) {
                        return 'Please enter campaign title';
                      }
                      return null;
                    },
                  ),
                  SizedBox(height: 10),
                  TextFormField(
                    controller: _decoration,
                    style: TextStyle(color: Colors.white),
                    maxLines: 5,
                    decoration: InputDecoration(
                      labelText: 'Description',
                      hintText: 'Enter Campaign Description',
                      labelStyle: TextStyle(color: Colors.white),
                      hintStyle: TextStyle(color: Colors.grey),
                      floatingLabelBehavior: FloatingLabelBehavior.always,
                    ),
                    validator: (value) {
                      if (value == null || value.trim().isEmpty) {
                        return 'Please enter campaign description';
                      }
                      if (value.trim().length < 50) {
                        return 'Description must be at least 50 characters long';
                      }
                      return null;
                    },
                  ),
                  SizedBox(height: 10),
                  TextFormField(
                    controller: _goal,
                    style: TextStyle(color: Colors.white),
                    keyboardType:
                        TextInputType.numberWithOptions(decimal: true),
                    inputFormatters: [
                      FilteringTextInputFormatter.allow(
                          RegExp(r'^\d*\.?\d{0,2}$')),
                    ],
                    decoration: InputDecoration(
                      labelText: 'Goal',
                      hintText: 'ETH 0.50',
                      labelStyle: TextStyle(color: Colors.white),
                      hintStyle: TextStyle(color: Colors.grey),
                      floatingLabelBehavior: FloatingLabelBehavior.always,
                    ),
                    validator: (value) {
                      if (value == null || value.isEmpty) {
                        return 'Please enter campaign goal';
                      }
                      double? parsedValue = double.tryParse(value);
                      if (parsedValue == null) {
                        return 'Please enter a valid number';
                      }
                      if (parsedValue > 35000) {
                        return 'Goal cannot exceed 35000';
                      }
                      if (parsedValue <= 0) {
                        return 'Goal must be greater than 0';
                      }
                      return null;
                    },
                  ),
                  SizedBox(height: 10),
                  TextFormField(
                    style: TextStyle(color: Colors.white),
                    readOnly: true,
                    controller: TextEditingController(
                      text: selectedDate != null
                          ? "${selectedDate!.day}/${selectedDate!.month}/${selectedDate!.year}"
                          : '',
                    ),
                    decoration: InputDecoration(
                      labelText: 'End Date',
                      hintText: 'dd/mm/yyyy',
                      labelStyle: TextStyle(color: Colors.white),
                      hintStyle: TextStyle(color: Colors.grey),
                      floatingLabelBehavior: FloatingLabelBehavior.always,
                      suffixIcon: IconButton(
                        icon: Icon(Icons.calendar_today),
                        color: Color.fromARGB(255, 74, 205, 141),
                        onPressed: () async {
                          final DateTime? pickedDate = await showDatePicker(
                            context: context,
                            initialDate: selectedDate ??
                                DateTime.now().add(
                                    Duration(days: 1)), // Start from tomorrow
                            firstDate: DateTime.now().add(
                                Duration(days: 1)), // Also start from tomorrow
                            lastDate: DateTime(2100),
                          );
                          if (pickedDate != null &&
                              pickedDate != selectedDate) {
                            setState(() {
                              selectedDate = pickedDate;
                              durationInDays = pickedDate;
                            });
                          }
                        },
                      ),
                    ),
                    validator: (value) {
                      if (value == null || value.isEmpty) {
                        return 'Please enter end date';
                      }
                      return null;
                    },
                  ),
                  SizedBox(height: 10),
                  TextFormField(
                    style: TextStyle(color: Colors.white),
                    readOnly: true,
                    controller: TextEditingController(
                      text: _image == null
                          ? 'No image selected.'
                          : 'Image selected',
                    ),
                    decoration: InputDecoration(
                      labelText: 'Campaign Image',
                      hintText: 'Place image URL of your campaign',
                      labelStyle: TextStyle(color: Colors.white),
                      hintStyle: TextStyle(color: Colors.grey),
                      floatingLabelBehavior: FloatingLabelBehavior.always,
                      suffixIcon: IconButton(
                        icon: Icon(Icons.image),
                        color: Color.fromARGB(255, 74, 205, 141),
                        onPressed: _pickImage,
                      ),
                    ),
                    validator: (value) {
                      if (_image == null) {
                        return 'Please select an image for your campaign';
                      }
                      return null;
                    },
                  ),
                  SizedBox(height: 10),
                  ListTile(
                    title: Text('Verify Your Campaign',
                        style: TextStyle(color: Colors.white)),
                    contentPadding: EdgeInsets.zero,
                    leading: Checkbox(
                      value: verified,
                      activeColor: Color.fromARGB(255, 74, 205, 141),
                      onChanged: (value) {
                        setState(() {
                          verified = value ?? false;
                        });
                      },
                    ),
                  ),
                  SizedBox(height: 20),
                  ElevatedButton(
                    onPressed: () {
                      if (_formKey.currentState!.validate()) {
                        _submit();
                      }
                    },
                    child:
                        Text('Submit', style: TextStyle(color: Colors.white)),
                    style: ButtonStyle(
                      backgroundColor: MaterialStateProperty.all<Color>(
                        Color.fromARGB(255, 74, 205, 141),
                      ),
                    ),
                  ),
                  SizedBox(height: 16),
                ],
              ),
            ),
          ),
          if (_isLoading)
            Container(
              color: Colors.black.withOpacity(0.5),
              child: Center(
                child: CircularProgressIndicator(
                  color: Color.fromARGB(255, 74, 205, 141),
                ),
              ),
            ),
        ],
      ),
    );
  }

  Future<void> _submit() async {
    if (_formKey.currentState!.validate()) {
      setState(() {
        _isLoading = true;
      });

      try {
        if (ipfsHash.isEmpty) {
          await _uploadImage();
        }

        if (ipfsHash.isNotEmpty) {
          final factory = Factory.getInstance();

          await factory.createCampaign(
            _title.text,
            _decoration.text,
            "https://ipfs.io/ipfs/" + ipfsHash,
            durationInDays,
            BigInt.from(double.parse(_goal.text) * 1000000000000000000),
            0,
            verified,
          );

          print("https://ipfs.io/ipfs/" + ipfsHash);

          // Show success message and navigate to home page
          ScaffoldMessenger.of(context).showSnackBar(
            SnackBar(content: Text('Successfully created campaign')),
          );

          // Navigate to home page
          Navigator.push(
            context,
            MaterialPageRoute(builder: (context) => HomePage()),
          );
        } else {
          throw Exception("IPFS hash is empty after upload");
        }
      } catch (e) {
        print("Error creating campaign: $e");

        // Show failure message
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('Failed to create campaign')),
        );
      } finally {
        setState(() {
          _isLoading = false;
        });
      }
    }
  }
}
