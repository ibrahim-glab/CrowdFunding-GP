// ignore_for_file: prefer_const_constructors, use_key_in_widget_constructors, library_private_types_in_public_api, prefer_const_constructors_in_immutables, file_names, unnecessary_string_interpolations, prefer_final_fields, use_build_context_synchronously, prefer_const_literals_to_create_immutables
import 'package:cached_network_image/cached_network_image.dart';
import 'package:flutter/material.dart';
import 'package:flutter_app/LoginPage.dart';
import 'package:flutter_app/helper/Campaign.dart';
import 'package:flutter_app/helper/moredetails.dart';
import 'package:flutter_app/helper/factory.dart';
import 'package:flutter_app/home%20page.dart';
import 'package:flutter_cache_manager/flutter_cache_manager.dart';
import 'package:provider/provider.dart';
import 'package:web3modal_flutter/web3modal_flutter.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'My Campaigns',
      theme: ThemeData(),
      home: CampaignsPage(),
    );
  }
}

class CampaignsPage extends StatefulWidget {
  @override
  _CampaignsPageState createState() => _CampaignsPageState();
}

class _CampaignsPageState extends State<CampaignsPage> {
  List<Campaign> allCampaigns = [];
  List<Campaign> displayedCampaigns = [];
  bool isLoading = false;

  Factory _factory = Factory.getInstance();

  Future<void> _initialize() async {
    setState(() {
      isLoading = true; // Start loading indicator
    });

    _factory.getCampaignsCreated().listen((campaigns) async {
      List<Campaign> validCampaigns = [];

      for (var camp in campaigns) {
        if (camp.owner != _factory.walletAddress) {
          continue;
        }

        if (camp.daysLeft > 0 && await statuscheck(camp.campaign)) {
          validCampaigns.add(camp);
        }
      }

      setState(() {
        allCampaigns = validCampaigns;
        displayedCampaigns = List.from(allCampaigns);
        isLoading = false; // Stop loading indicator when data is fetched
      });
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
    moredetails m = await _factory.getMoreDetailsOfCampaign(address);
    return m.status == 0 || m.status == 1 || m.status == 3;
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
      body: Column(
        children: [
          SizedBox(height: 20),
          Padding(
            padding: const EdgeInsets.symmetric(horizontal: 16),
            child: TextField(
              style: TextStyle(color: Colors.white),
              cursorColor: Color.fromARGB(255, 74, 205, 141),
              decoration: InputDecoration(
                hintText: 'Search...',
                hintStyle: TextStyle(color: Colors.white),
                suffixIcon: IconButton(
                  icon: Icon(Icons.search),
                  onPressed: () {},
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
            child: Text(
              'My Campaigns',
              style: TextStyle(
                fontSize: 24,
                fontWeight: FontWeight.bold,
                color: Colors.white,
              ),
            ),
          ),
          SizedBox(height: 10),
          isLoading
              ? Center(
                  child: CircularProgressIndicator(
                    valueColor: AlwaysStoppedAnimation<Color>(
                      Color.fromARGB(255, 74, 205, 141),
                    ),
                  ),
                )
              : Expanded(
                  child: displayedCampaigns.isEmpty
                      ? Center(
                          child: Text(
                            'No campaigns found.',
                            style: TextStyle(color: Colors.white),
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
                              child: CampaignCard(displayedCampaigns[index]),
                            );
                          },
                        ),
                ),
        ],
      ),
    );
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
}

class CampaignCard extends StatelessWidget {
  final Campaign campaign;

  CampaignCard(this.campaign);

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

void _navigateToCampaignDetails(BuildContext context, Campaign campaign) {
  Navigator.push(
    context,
    MaterialPageRoute(
      builder: (context) => CampaignDetailsPage(campaign),
    ),
  );
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

  /*
   Future<void> _initialize() async {
  _factory.getMoreDetailsOfCampaign(widget.campaign.campaign).listen((a) async {
    setState(() {
      widget.campaign.TotalBackers = a.TotalBackers;
      widget.campaign.raised = a.totalContributions;
      progress = a.totalContributions / widget.campaign.goal; // Update progress locally
      numberOfContributions = a.TotalBackers;
    });
  });
}*/

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
        title:
            Text(widget.campaign.title, style: TextStyle(color: Colors.white)),
      ),
      body: Padding(
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
          ],
        ),
      ),
    );
  }
}
