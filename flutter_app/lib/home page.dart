// ignore_for_file: prefer_const_constructors, use_key_in_widget_constructors, prefer_const_constructors_in_immutables, library_private_types_in_public_api, file_names, no_logic_in_create_state, unnecessary_string_interpolations, unused_element, deprecated_member_use, prefer_final_fields, use_build_context_synchronously, prefer_const_literals_to_create_immutables, non_constant_identifier_names, unused_local_variable

import 'package:cached_network_image/cached_network_image.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_app/LoginPage.dart';
import 'package:flutter_app/helper/Campaign.dart';
import 'package:flutter_app/helper/moredetails.dart';
import 'package:flutter_app/helper/factory.dart';
import 'package:flutter_cache_manager/flutter_cache_manager.dart';
import 'package:provider/provider.dart';
import 'package:web3modal_flutter/web3modal_flutter.dart';

import 'Campaigns.dart';
import 'Create Campaign Page.dart';

import 'history.dart';
import 'status.dart';

void main() {
  runApp(
    ChangeNotifierProvider(
      create: (context) => Factory(),
      child: MyApp(),
    ),
  );
}

class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      home: LoginPage(), // Change this line to LoginPage()
    );
  }
}

class HomePage extends StatefulWidget {
  @override
  _HomePageState createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  TextEditingController searchController = TextEditingController();
  List<Campaign> allCampaigns = [];
  List<Campaign> displayedCampaigns = [];
  Factory _factory = Factory.getInstance();
  bool isLoading = true; // Add a loading indicator state

  Future<void> _initialize() async {
    _factory.getCampaignsCreated().listen((campaigns) async {
      List<Campaign> validCampaigns = [];
      for (var camp in campaigns) {
        if (camp.daysLeft > 0 && await statuscheck(camp.campaign)) {
          validCampaigns.add(camp);
        }
      }
      setState(() {
        allCampaigns = validCampaigns;
        displayedCampaigns = List.from(allCampaigns);
        isLoading = false; // Set loading to false when data is loaded
      });

      // Load additional campaign details and update statuses
    });
  }

  @override
  void initState() {
    _initialize();
    super.initState();
  }

  void _searchCampaigns(String keyword) {
    setState(() {
      displayedCampaigns = allCampaigns
          .where((campaign) =>
              campaign.title.toLowerCase().contains(keyword.toLowerCase()) ||
              campaign.byAddress.toLowerCase().contains(keyword.toLowerCase()))
          .toList();
    });
  }

  void _refreshCampaigns() {
    setState(() {
      allCampaigns.clear();
      displayedCampaigns.clear();
      isLoading = true; // Set loading to true before reloading data
      _initialize();
    });
  }

  Future<bool> statuscheck(EthereumAddress address) async {
    bool check = false;
    moredetails m = await _factory.getMoreDetailsOfCampaign(address);
    if (m.status == 0) {
      check = true;
    }
    return check;
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
            icon: Icon(Icons.refresh),
            onPressed: () {
              _refreshCampaigns();
            },
          ),
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
      body: Stack(
        children: [
          Column(
            children: [
              SizedBox(height: 20),
              Padding(
                padding: const EdgeInsets.symmetric(horizontal: 16),
                child: TextField(
                  controller: searchController,
                  style: TextStyle(color: Colors.white),
                  cursorColor: Color.fromARGB(255, 74, 205, 141),
                  decoration: InputDecoration(
                    hintText: 'Search...',
                    hintStyle: TextStyle(color: Colors.white),
                    suffixIcon: IconButton(
                      icon: Icon(Icons.search),
                      onPressed: () {
                        _searchCampaigns(searchController.text);
                      },
                    ),
                    border: OutlineInputBorder(
                      borderRadius: BorderRadius.circular(20),
                    ),
                    focusedBorder: OutlineInputBorder(
                      borderRadius: BorderRadius.circular(20),
                      borderSide: BorderSide(
                        color: Color.fromARGB(255, 74, 205, 141),
                      ),
                    ),
                    filled: true,
                    fillColor: Color.fromARGB(255, 28, 28, 35),
                  ),
                  onChanged: (value) => _searchCampaigns(value),
                ),
              ),
              SizedBox(height: 10),
              Padding(
                padding: const EdgeInsets.symmetric(horizontal: 16),
              ),
              SizedBox(height: 10),
              Expanded(
                child: isLoading
                    ? Center(
                        child: CircularProgressIndicator(
                          valueColor: AlwaysStoppedAnimation<Color>(
                            Color.fromARGB(255, 74, 205, 141),
                          ),
                        ),
                      )
                    : ListView.builder(
                        itemCount: displayedCampaigns.length,
                        itemBuilder: (context, index) {
                          return Padding(
                            padding: EdgeInsets.only(
                              top: index == 0 ? 0 : 10,
                              bottom: index == displayedCampaigns.length - 1
                                  ? 0
                                  : 10,
                            ),
                            child: CampaignCard(
                              campaign: displayedCampaigns[index],
                              onTap: () {
                                // Navigate to campaign details page
                              },
                            ),
                          );
                        },
                      ),
              ),
            ],
          ),
        ],
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: () {
          Navigator.push(
            context,
            MaterialPageRoute(builder: (context) => CreateNewCampaign()),
          );
        },
        child: Icon(Icons.add),
      ),
    );
  }
}

class CampaignCard extends StatelessWidget {
  final Campaign campaign;
  final VoidCallback onTap;

  CampaignCard({
    required this.campaign,
    required this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: () => _navigateToCampaignDetails(context, campaign),
      child: Padding(
        padding: EdgeInsets.symmetric(vertical: 10.0, horizontal: 16.0),
        child: Card(
          color: Color.fromARGB(255, 35, 35, 42),
          clipBehavior: Clip.antiAlias,
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(15),
          ),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: <Widget>[
              CachedNetworkImage(
                imageUrl: campaign.imageUrl,
                errorWidget: (context, url, error) => Icon(Icons.error),
                height: 200,
                width: double.infinity,
                fit: BoxFit.cover,
                cacheManager: DefaultCacheManager(), // Required parameter
              ),
              SizedBox(height: 40),
              Padding(
                padding: EdgeInsets.all(8.0),
                child: Row(
                  children: [
                    Expanded(
                      child: Text(
                        campaign.title,
                        style: TextStyle(
                          fontSize: 18,
                          fontWeight: FontWeight.bold,
                          color: Colors.white,
                        ),
                        maxLines:
                            2, // Example: Limit to 2 lines to prevent overflow
                        overflow: TextOverflow.ellipsis,
                      ),
                    ),
                    if (campaign.verified == true) // Conditional rendering

                      Padding(
                        padding: const EdgeInsets.only(left: 8.0),
                        child: Image.asset(
                          'assets/Verified Logo.png',
                          height: 24.0,
                          width: 24.0,
                        ),
                      ),
                  ],
                ),
              ),
              Padding(
                padding: EdgeInsets.symmetric(horizontal: 8.0),
                child: Text(
                  campaign.subtitle,
                  style: TextStyle(fontSize: 16, color: Colors.grey),
                  maxLines: 1,
                  overflow: TextOverflow.ellipsis,
                ),
              ),
              SizedBox(height: 20),
              Padding(
                padding: EdgeInsets.all(8.0),
                child: Column(
                  children: <Widget>[
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: <Widget>[
                        Text(
                          '${campaign.goal.toStringAsFixed(2)}',
                          style: TextStyle(fontSize: 16, color: Colors.white),
                        ),
                        Text(
                          '${campaign.daysLeft.toString()} ',
                          style: TextStyle(color: Colors.white),
                        ),
                      ],
                    ),
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: <Widget>[
                        Text(
                          'Goal',
                          style: TextStyle(fontSize: 16, color: Colors.grey),
                        ),
                        Text(
                          'Days Left',
                          style: TextStyle(color: Colors.grey),
                        ),
                      ],
                    ),
                  ],
                ),
              ),
              SizedBox(height: 10),
              Padding(
                padding: EdgeInsets.symmetric(horizontal: 8.0, vertical: 4.0),
                child: Row(
                  children: [
                    Image.asset(
                      'assets/thirdweb.png',
                      height: 24.0,
                      width: 24.0,
                    ),
                    SizedBox(width: 8),
                    Expanded(
                      child: Text(
                        'by ${campaign.byAddress}',
                        style: TextStyle(color: Colors.white),
                        overflow: TextOverflow.ellipsis,
                      ),
                    ),
                  ],
                ),
              ),
              SizedBox(height: 8),
            ],
          ),
        ),
      ),
    );
  }
}

class CampaignDetailsPage extends StatefulWidget {
  final Campaign campaign;

  CampaignDetailsPage(this.campaign);

  @override
  _CampaignDetailsPageState createState() => _CampaignDetailsPageState();
}

class _CampaignDetailsPageState extends State<CampaignDetailsPage> {
  double progress = 0.0; // Track the progress of the campaign
  int numberOfContributions = 0; // Track the number of contributions
  Factory _factory = Factory.getInstance();

  Future<void> _initialize() async {
    moredetails a =
        await _factory.getMoreDetailsOfCampaign(widget.campaign.campaign);

    setState(() {
      widget.campaign.TotalBackers = a.TotalBackers;
      widget.campaign.raised = a.totalContributions;
      progress = a.totalContributions /
          widget.campaign.goal; // Update progress locally
      numberOfContributions =
          a.TotalBackers; // Update number of contributions locally
    });
  }

  void _refreshCampaigns() {
    setState(() {
      _initialize();
    });
  }

  @override
  void initState() {
    _initialize();
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Color.fromARGB(255, 28, 28, 35),
      appBar: AppBar(
        backgroundColor: const Color.fromARGB(255, 74, 205, 141),
        title: Row(
          children: [
            Text(
              widget.campaign.title,
              style: TextStyle(color: Colors.white),
            ),
          ],
        ),
        actions: [
          IconButton(
            icon: Icon(Icons.refresh),
            onPressed: () {
              _refreshCampaigns();
            },
          ),
        ],
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            CachedNetworkImage(
              imageUrl: widget.campaign.imageUrl,
              placeholder: (context, url) => CircularProgressIndicator(),
              errorWidget: (context, url, error) => Icon(Icons.error),
              height: 200,
              width: double.infinity,
              fit: BoxFit.cover,
            ),
            SizedBox(height: 16.0),
            Text('Title: ${widget.campaign.title}',
                style: TextStyle(color: Colors.white)),
            SizedBox(height: 8.0),
            Text('Description: ${widget.campaign.subtitle}',
                style: TextStyle(color: Colors.white)),
            SizedBox(height: 8.0),
            Text('Raised: ${widget.campaign.raised.toStringAsFixed(4)} ETH',
                style: TextStyle(color: Colors.white)),
            SizedBox(height: 8.0),
            Text('Goal: ${widget.campaign.goal.toStringAsFixed(1)} ETH',
                style: TextStyle(color: Colors.white)),
            SizedBox(height: 8.0),
            Text(
                'Progress: ${(widget.campaign.raised / widget.campaign.goal * 100).toStringAsFixed(2)}%',
                style: TextStyle(color: Colors.white)),
            SizedBox(height: 8.0),
            Text('Days Left: ${widget.campaign.daysLeft}',
                style: TextStyle(color: Colors.white)),
            SizedBox(height: 8.0),
            Text('Address: ${widget.campaign.byAddress}',
                style: TextStyle(color: Colors.white, fontSize: 13.0)),
            SizedBox(height: 8.0),
            Text('Number of Contributors: ${widget.campaign.TotalBackers}',
                style: TextStyle(color: Colors.white)),
            SizedBox(height: 16.0),
            if (widget.campaign.owner != _factory.walletAddress)
              Center(
                child: ElevatedButton(
                  onPressed: () {
                    _showFundDialog(context);
                  },
                  style: ElevatedButton.styleFrom(
                    padding: EdgeInsets.symmetric(horizontal: 24.0),
                    backgroundColor: const Color.fromARGB(255, 74, 205, 141),
                  ),
                  child: Text('Fund', style: TextStyle(color: Colors.white)),
                ),
              ),
          ],
        ),
      ),
    );
  }

  void _showFundDialog(BuildContext context) async {
    showDialog(
      context: context,
      builder: (BuildContext context) {
        TextEditingController amountController = TextEditingController();
        RegExp decimalRegex =
            RegExp(r'^\d*\.?\d*$'); // Regex to match decimal numbers

        // Calculate the remaining amount needed to reach the goal
        double remainingAmount = widget.campaign.goal - widget.campaign.raised;
        print(remainingAmount);

        return AlertDialog(
          backgroundColor: Color.fromARGB(255, 28, 28, 35),
          title: Text(
            'Enter Fund Amount',
            style: TextStyle(color: Colors.white),
          ),
          content: SingleChildScrollView(
            child: Column(
              mainAxisSize: MainAxisSize.min,
              children: [
                TextField(
                  controller: amountController,
                  keyboardType: TextInputType.numberWithOptions(decimal: true),
                  inputFormatters: [
                    FilteringTextInputFormatter.allow(decimalRegex),
                  ],
                  decoration: InputDecoration(
                    labelText: 'Amount (max $remainingAmount ETH)',
                    labelStyle: TextStyle(color: Colors.white),
                  ),
                  style: TextStyle(color: Colors.white),
                ),
              ],
            ),
          ),
          actions: [
            ElevatedButton(
              style: ButtonStyle(
                backgroundColor: MaterialStateProperty.all<Color>(
                    Color.fromARGB(255, 74, 205, 141)),
                foregroundColor: MaterialStateProperty.all<Color>(Colors.white),
              ),
              onPressed: () async {
                String enteredAmount = amountController.text.trim();
                if (enteredAmount.isEmpty) {
                  return;
                }

                try {
                  double amount = double.parse(enteredAmount);
                  if (amount > remainingAmount) {
                    _showSuccessToast(context,
                        'Amount cannot exceed remaining goal: $remainingAmount ETH');
                    return;
                  }

                  if (amount > 35000) {
                    _showSuccessToast(
                        context, 'Amount cannot exceed 35,000 ETH');
                    return;
                  }

                  int amountInWei = (amount * 1000000000000000000).toInt();

                  // Show loading dialog
                  _showLoadingDialog(context);

                  // Call your funding function with the calculated amount in Wei
                  String result = await _factory.funding(
                      widget.campaign.campaign, amountInWei);

                  Navigator.pop(context); // Close the loading dialog

                  if (result.startsWith("Transaction Id:")) {
                    _showSuccessToast(
                        context, "Transaction successful: $result");
                  } else {
                    _showSuccessToast(context, "Transaction failed: $result");
                  }
                } catch (e) {
                  Navigator.pop(context); // Close the loading dialog
                  _showSuccessToast(context, 'Error funding: $e');
                }

                Navigator.pop(context); // Close the fund dialog
              },
              child: Text('Fund'),
            ),
          ],
        );
      },
    );
  }

  void _showLoadingDialog(BuildContext context) {
    showDialog(
      context: context,
      barrierDismissible: false,
      builder: (BuildContext context) {
        return Center(
          child: CircularProgressIndicator(),
        );
      },
    );
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
}

// Utility method to navigate to CampaignDetailsPage
void _navigateToCampaignDetails(BuildContext context, Campaign campaign) {
  Navigator.push(
    context,
    MaterialPageRoute(
      builder: (context) => CampaignDetailsPage(campaign),
    ),
  );
}

class SideMenu extends StatefulWidget {
  @override
  _SideMenuState createState() => _SideMenuState();
}

class _SideMenuState extends State<SideMenu> {
  bool isExpanded = false;

  @override
  Widget build(BuildContext context) {
    double drawerWidth = isExpanded ? 250 : 70;

    return AnimatedContainer(
      duration: Duration(milliseconds: 250),
      width: drawerWidth,
      child: Drawer(
        child: Container(
          color: Color.fromARGB(255, 28, 28, 35),
          child: SingleChildScrollView(
            child: Column(
              children: [
                UserAccountsDrawerHeader(
                  accountName: isExpanded
                      ? Text(
                          'Welcome',
                          style: TextStyle(
                            color: Colors.white,
                            fontSize: 24,
                          ),
                        )
                      : null,
                  accountEmail: isExpanded
                      ? Text(
                          'Thank you for joining us',
                          style: TextStyle(color: Colors.white),
                        )
                      : null,
                  currentAccountPicture: Align(
                    alignment: Alignment.centerLeft,
                    child: Padding(
                      padding: EdgeInsets.only(
                          left: isExpanded
                              ? 16.0
                              : 0.0), // Adjust the padding based on the condition
                      child: CircleAvatar(
                        backgroundColor:
                            isExpanded ? Colors.white : Colors.white,
                        radius: isExpanded ? 100 : 0,
                        child: Icon(
                          Icons.api,
                          size: isExpanded ? 50 : 34,
                          color: isExpanded
                              ? Color.fromARGB(255, 74, 205, 141)
                              : Colors.white,
                        ),
                      ),
                    ),
                  ),
                  decoration: BoxDecoration(
                    color: Color.fromARGB(255, 74, 205, 141),
                  ),
                ),
                buildMenuItem(
                  icon: Icons.home,
                  text: 'Home',
                  onTap: () {
                    Navigator.pop(context);
                    Navigator.push(
                      context,
                      MaterialPageRoute(
                        builder: (context) => HomePage(),
                      ),
                    );
                  },
                ),
                buildMenuItem(
                  icon: Icons.list_alt,
                  text: 'Campaigns',
                  onTap: () {
                    Navigator.pop(context);
                    Navigator.push(
                      context,
                      MaterialPageRoute(builder: (context) => CampaignsPage()),
                    );
                  },
                ),
                buildMenuItem(
                  icon: Icons.add_circle,
                  text: 'Create a Campaign',
                  onTap: () {
                    Navigator.pop(context);
                    Navigator.push(
                      context,
                      MaterialPageRoute(
                        builder: (context) => CreateNewCampaign(),
                      ),
                    );
                  },
                ),
                buildMenuItem(
                  icon: Icons.history,
                  text: 'History of Transactions',
                  onTap: () {
                    Navigator.pop(context);
                    Navigator.push(
                      context,
                      MaterialPageRoute(builder: (context) => History()),
                    );
                  },
                ),
                buildMenuItem(
                  icon: Icons.check_circle,
                  text: 'Requested Campaigns Status',
                  onTap: () {
                    Navigator.pop(context);
                    Navigator.push(
                      context,
                      MaterialPageRoute(builder: (context) => RequestStat()),
                    );
                  },
                ),
                buildMenuItem(
                  icon: Icons.logout,
                  text: 'Logout',
                  onTap: () async {
                    final factory =
                        Provider.of<Factory>(context, listen: false);
                    await factory.logout();

                    Navigator.pushAndRemoveUntil(
                      context,
                      MaterialPageRoute(builder: (context) => LoginPage()),
                      (Route<dynamic> route) => false,
                    );
                  },
                ),
                SizedBox(height: 60),
                InkWell(
                  onTap: () {
                    setState(() {
                      isExpanded = !isExpanded;
                    });
                  },
                  child: Padding(
                    padding: const EdgeInsets.all(8.0),
                    child: Icon(
                      isExpanded
                          ? Icons.arrow_back_ios
                          : Icons.arrow_forward_ios,
                      color: Colors.white,
                      size: 30,
                    ),
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }

  Widget buildMenuItem({
    required IconData icon,
    required String text,
    required VoidCallback onTap,
  }) {
    return ListTile(
      leading: Icon(
        icon,
        color: Colors.white,
      ),
      title: isExpanded
          ? Text(
              text,
              style: TextStyle(color: Colors.white),
            )
          : null,
      onTap: onTap,
    );
  }
}
