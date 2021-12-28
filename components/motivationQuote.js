import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  View,
  Button,
  Image,
  ScrollView,
  TouchableOpacity,
  PermissionsAndroid,
  Platform,
  StatusBar,
  FlatList,
} from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';

export default class MotivationQuote extends Component {
  state = {
    result: 'loading',
    loading: false,
    staytune: false,
    image_URL: '',
  };

  async checkPermission() {
    if (Platform.OS === 'ios') {
      console.log('Not Android');
    } else {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'Storage Permission Required',
            message: 'This app needs access to your storage to download Photos',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          //Once user grant the permission start downloading
          console.log('Storage Permission Granted.');

          this.downloadImg();
        } else {
          //If permission denied then show alert 'Storage Permission Not Granted'
          alert('Storage Permission Not Granted');
        }
      } catch (err) {
        //To handle permission related issue
        console.warn(err);
      }
    }
  }

  getExtension(filename) {
    return filename.split('.').pop();
  }

  downloadImg() {
    let date = new Date(); //To add the time suffix in filename
    let ext = this.getExtension(this.state.image_URL);
    ext = '.' + 'png';
    const {config, fs} = RNFetchBlob;
    let PictureDir = fs.dirs.PictureDir;
    let options = {
      fileCache: true,
      addAndroidDownloads: {
        //Related to the Android only
        useDownloadManager: true,
        notification: true,
        path:
          PictureDir +
          '/quote_' +
          Math.floor(date.getTime() + date.getSeconds() / 2) +
          ext,
        description: 'Quote',
      },
    };
    config(options)
      .fetch('GET', this.state.image_URL)
      .then((res) => {
        //Showing alert after successful downloading
        console.log('res -> ', JSON.stringify(res));
        alert('Quote Downloaded Successfully.');
      });
  }

  GetQuotes() {
    this.setState({loading: true});
    fetch('https://surendragiri.com/quotes4life/motivation/love/read.php', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then((data) => data.json())
      .then((data2) => {
        console.log(data2);
        this.setState({
          result: data2.records,
          loading: false,
          staytune: true,
        });
      })
      .catch((error) => {
        if (error) {
          this.setState({
            neterror: true,
          });
        }
      });
  }

  componentDidMount() {
    this.GetQuotes();
  }

  Quotes() {
    if (this.state.result == 'loading') {
      return <Text style={styles.textStyle}></Text>;
    } else {
      return (
        <View style={{alignItems: 'center'}}>
          <FlatList
          style={{ marginBottom:50}}
            data={this.state.result}
            showsVerticalScrollIndicator={false}
            renderItem={({item}) => (
              <View style={{flex: 1, flexDirection: 'row'}}>
                <TouchableOpacity
                  onPress={() => this.checkPermission()}
                  onPressIn={() =>
                    this.setState({
                      image_URL: `https://surendragiri.com/quotes4life/motivation/uploads/${item.image}`,
                    })
                  }>
                  <Image
                    source={{
                      uri: `https://surendragiri.com/quotes4life/motivation/uploads/${item.image}`,
                    }}
                    style={{
                      width: 300,
                      height: 300,
                      alignItems: 'center',
                      resizeMode: 'contain',
                      borderRadius: 5,
                      marginBottom: 20,
                    }}
                  />
                </TouchableOpacity>
              </View>
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      );
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View
          style={{
            padding: 8,
            width: 300,
            alignItems: 'center',
            alignSelf: 'center',
          }}>
          <Button
            onPress={() => this.componentDidMount()}
            title="refresh for latest quotes"
            color="#54bfa4"
          />
        </View>

          <View>{this.Quotes()}</View>

         
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  textStyle: {
    fontSize: 15,
  },
  quotecontainer: {
    alignItems: 'center',
    paddingTop: 10,
  },
});
