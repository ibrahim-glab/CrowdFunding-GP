import 'dart:convert';
import 'dart:io';
import 'package:http/http.dart' as http;

class PinataUploader {
  final String apiKey = '37a7770b401d41da7d95';
  final String secretApiKey =
      '94aebe18895fade0e942c6a36766f02f100516084c75c0449457a1b5db8819fe';

  Future<String?> uploadImage(File image) async {
    final url = Uri.parse('https://api.pinata.cloud/pinning/pinFileToIPFS');

    final request = http.MultipartRequest('POST', url)
      ..headers['pinata_api_key'] = apiKey
      ..headers['pinata_secret_api_key'] = secretApiKey
      ..files.add(await http.MultipartFile.fromPath('file', image.path));

    final response = await request.send();

    if (response.statusCode == 200) {
      final responseData = await response.stream.bytesToString();
      final jsonData = json.decode(responseData);
      return jsonData['IpfsHash']; // Return IpfsHash if upload successful
    } else {
      print('Upload failed with status: ${response.statusCode}');
      final responseBody = await response.stream.bytesToString();
      print('Response body: $responseBody');
      return null; // Return null or handle error appropriately
    }
  }
}
