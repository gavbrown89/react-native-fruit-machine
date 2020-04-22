/**
 * React Native Fruit Machine Game
 */

import React, { Component } from 'react';
import {
  View,
  Button,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  ImageBackground,
  StatusBar,
  TouchableOpacity,
  Text
} from 'react-native';

import { withNavigationFocus } from 'react-navigation';

import Reels from '../components/reels';

var MAX_WIDTH = Dimensions.get('screen').width;
var MAX_HEIGHT = Dimensions.get('screen').height;
var H_RATIO = Dimensions.get('screen').width / 667;

import BackgroundImage from '../assets/images/main_background.jpg';
import HeaderImage from '../assets/images/header.png';
import FooterImage from '../assets/images/footer.png';

class GameScreen extends React.Component {
  constructor(props) {
    super(props);
    this.reelContainer = null;
  }

  render() {
    return (
      <ImageBackground source={BackgroundImage} style={styles.container}>
          <StatusBar hidden={true} />
          <ImageBackground source={HeaderImage} style={styles.header} />
          <SafeAreaView style={styles.playContainer}>
            <Reels ref={(ref) => {this.reelContainer = ref; }} />
          </SafeAreaView>
          <ImageBackground source={FooterImage} style={styles.btnContainer}>
            <TouchableOpacity
              onPress={() => { this.reelContainer.spin()}}
              style={styles.spinBtn}
            >
              <Text style={{ color: '#fff', textAlign: 'center', textTransform: 'uppercase', fontWeight: 'bold'}}>Spin</Text>
            </TouchableOpacity>

          </ImageBackground>
      </ImageBackground>
    );
  }
};

export default withNavigationFocus(GameScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    resizeMode: 'stretch',
  },
  header: {
    width: MAX_WIDTH,
    height: H_RATIO * 50,
  },
  btnContainer: {
    height: H_RATIO * 52,
    width: MAX_WIDTH,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  playContainer: {
    height: MAX_HEIGHT - (50 + 52) * H_RATIO,
    width: MAX_WIDTH,
  },
  spinBtn: {
    backgroundColor: '#7dc242',
    width: 100,
    height: 35,
    borderRadius: 10,
    justifyContent: 'center'
  },
});
