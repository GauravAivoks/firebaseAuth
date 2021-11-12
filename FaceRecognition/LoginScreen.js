import React from 'react';
import { StyleSheet, View, Text, TextInput, Image, ScrollView, PermissionsAndroid, TouchableHighlight } from 'react-native';
import * as ImagePicker from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RNS3 } from 'react-native-aws3';

class LoginScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      capturedImage: '',
      uploadSuccessMessage: ''
    };
  }


  cameraLaunch = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: "Cool Photo App Camera Permission",
          message:
            "Cool Photo App needs access to your camera " +
            "so you can take awesome pictures.",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK"
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("You can use the camera");
        let options = {
          title: 'Select Image',
          mediaType: 'photo',
          includeBase64: true,
          maxHeight: 200,
          maxWidth: 200,
          customButtons: [
            { name: 'customOptionKey', title: 'Choose Photo from Custom Option' },
          ],
          storageOptions: {
            skipBackup: true,
            path: 'images',
          },
        };

        ImagePicker.launchCamera(options, (res) => {
          if (res.didCancel) {
            alert('Please pick Image first')
          } else if (res.error) {
            alert(res.error);
          } else if (res.customButton) {
            // console.log('User tapped custom button: ', res.customButton);
            alert(res.customButton);
          } else {
            const source = { uri: res.uri };
            // console.log('response', JSON.stringify(res.assets[0].base64));
            // Store Image in Local
            console.log(JSON.stringify(res.assets[0].uri), "Gaurav")
            AsyncStorage.setItem('imageData', res.assets[0].uri);
            this.setState({
              user_img: res.assets[0].base64,
              profile: res.assets[0].uri,
              capturedImage: res.assets[0]
            });
          }
        });
      } else {
        console.log("Camera permission denied");
      }
    } catch (err) {
      console.warn(err);
    }
  }




  submitButton = () => {
    const AWS = require('aws-sdk')
    var rekognition = new AWS.Rekognition()
    var s3Bucket = new AWS.S3({ params: { Bucket: "laravel-first-time-amazon-s3" } });
    // var fs = require('fs');
    var fs = require('react-native-fs')

    exports.handler = (event, context, callback) => {
      let parsedData = JSON.parse(event)
      let encodedImage = parsedData.Image;
      var filePath = "registered/" + parsedData.name;
      console.log(filePath)
      let decodedImage = new Buffer(encodedImage.replace(/^data:image\/\w+;base64,/, ""), 'base64')
      var data = {
        Key: filePath,
        Body: decodedImage,
        ContentEncoding: 'base64',
        ContentType: 'image/jpeg'
      };
      s3Bucket.putObject(data, function (err, data) {
        if (err) {
          console.log('Error uploading data: ', data);
          callback(err, null);
        } else {
          console.log('succesfully uploaded the image!');
          callback(null, data);
        }
      });
    };
  }


  uploadFile = () => {
    if (Object.keys(this.state.capturedImage).length == 0) {
      alert('Please select image first');
      return;
    }
    RNS3.put(
      {
        // `uri` can also be a file system path (i.e. file://)
        uri: this.state.capturedImage.uri,
        name: this.state.capturedImage.fileName,
        type: this.state.capturedImage.type,
      },
      {
        // keyPrefix: 'laravel-first-time-amazon-s3', // Ex. myuploads/
        bucket: 'laravel-first-time-amazon-s3',
        region: 'ap-south-1', // Ex. ap-south-1
        accessKey: 'AKIATTVEJWOMWOYEHXPO',
        // accessKey: 'AKIATTVEJWOM5AQRIMVX',
        // Ex. AKIH73GS7S7C53M46OQ
        secretKey: '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',
        // secretKey: '3a3tk7NEUPMKHPcC1ekbOTtouVA2fG2p9eTagAw2',
        // Ex. Pt/2hdyro977ejd/h2u8n939nh89nfdnf8hd8f8fd
        successActionStatus: 201,
      },
    )
      .progress((progress) =>
        this.setState(
          {
            uploadSuccessMessage: `Uploading: ${progress.loaded / progress.total} (${progress.percent
              }%)`
          },
        ),
      )
      .then((response) => {
        if (response.status !== 201)
          alert('Failed to upload image to S3');
        console.log(response.body);
        // setFilePath('');
        this.setState({ capturedImage: response.body })
        this
        let {
          bucket,
          etag,
          key,
          location
        } = response.body.postResponse;
        this.setState({
          uploadSuccessMessage:
            `Uploaded Successfully: 
          \n1. bucket => ${bucket}
          \n2. etag => ${etag}
          \n3. key => ${key}
          \n4. location => ${location}`,
        });
      });
  };


  data = () => {
    const AWS = require('aws-sdk')
    var rekognition = new AWS.Rekognition()
    var s3Bucket = new AWS.S3({ params: { Bucket: "laravel-first-time-amazon-s3" } });
    // var fs = require('fs');
    var fs = require('react-native-fs')

    exports.handler = (event, context, callback) => {
      console.log(event);
      console.log(typeof event);
      console.log(JSON.parse(event));
      let parsedData = JSON.parse(event)
      let encodedImage = parsedData.Image;
      var filePath = "registered/" + parsedData.name;
      console.log(filePath)
      let buf = new Buffer(encodedImage.replace(/^data:image\/\w+;base64,/, ""), 'base64')
      var data = {
        Key: filePath,
        Body: buf,
        ContentEncoding: 'base64',
        ContentType: 'image/jpeg'
      };
      s3Bucket.putObject(data, function (err, data) {
        if (err) {
          console.log('Error uploading data: ', data);
          callback(err, null);
        } else {
          console.log('succesfully uploaded the image!');
          // callback(null, data);
        }
      });
      var params = {
        CollectionId: "face-collection",
        DetectionAttributes: [],
        ExternalImageId: parsedData.name,
        Image: {
          S3Object: {
            Bucket: "face-recognise-test",
            Name: filePath
          }
        }
      }
      setTimeout(function () {
        rekognition.indexFaces(params, function (err, data) {
          if (err) {
            console.log(err, err.stack); // an error occurred
            callback(err)
          }
          else {
            console.log(data);           // successful response
            callback(null, data);
          }
        });
      }, 3000);
    };
  }




  captureImageButtonHandler = () => {
    ImagePicker.launchImageLibrary({ title: "Pick an Image", maxWidth: 800, maxHeight: 600 }, (response) => {
      console.log('Response = ', response);
      // alert(response)
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        // You can also display the image using data:
        const source = { uri: 'data:image/jpeg;base64,' + response.data };
        this.setState({ capturedImage: response.assets[0], base64String: source.uri });
      }
    });
  }

  render() {
    return (
      <View style={styles.MainContainer}>
        <ScrollView>
          <Text style={{ fontSize: 20, color: "#000", textAlign: 'center', marginBottom: 15, marginTop: 10 }}>Register Face</Text>

          <TextInput
            placeholder="Enter Username"
            onChangeText={UserName => this.setState({ username: UserName })}
            underlineColorAndroid='transparent'
            style={styles.TextInputStyleClass}
          />
          {this.state.capturedImage !== "" && <View style={styles.imageholder} >
            <Image source={{ uri: this.state.capturedImage.uri }} style={styles.previewImage} />
          </View>}


          <TouchableHighlight
            onPress={() => { this.captureImageButtonHandler() }}
            style={[styles.buttonContainer, styles.captureButton]}>
            <Text style={styles.buttonText}>Capture Image</Text>
          </TouchableHighlight>

          <TouchableHighlight
            onPress={() => { this.uploadFile() }}
            style={[styles.buttonContainer, styles.submitButton]}>
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableHighlight>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  MainContainer: {
    marginTop: 60
  },
  TextInputStyleClass: {
    textAlign: 'center',
    marginBottom: 7,
    height: 40,
    borderWidth: 1,
    margin: 10,
    borderColor: '#D0D0D0',
    borderRadius: 5,
  },
  inputContainer: {
    borderBottomColor: '#F5FCFF',
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    borderBottomWidth: 1,
    width: 300,
    height: 45,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center'
  },
  buttonContainer: {
    height: 45,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    width: "80%",
    borderRadius: 30,
    marginTop: 20,
    marginLeft: 5,
  },
  captureButton: {
    backgroundColor: "#337ab7",
    width: 350,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10
  },
  submitButton: {
    backgroundColor: "#C0C0C0",
    width: 350,
    marginTop: 5,
  },
  imageholder: {
    borderWidth: 1,
    borderColor: "grey",
    backgroundColor: "#eee",
    width: "50%",
    height: 150,
    marginTop: 10,
    marginLeft: 90,
    flexDirection: 'row',
    alignItems: 'center'
  },
  previewImage: {
    width: "100%",
    height: "100%",
  }
});

export default LoginScreen;