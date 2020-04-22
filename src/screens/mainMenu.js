import React, { Component } from 'react';
import {
    View,
    Text,
    ImageBackground,
    TouchableOpacity,
    StyleSheet,
    Image,
    StatusBar
} from 'react-native';
import { withNavigationFocus } from 'react-navigation';

import MenuBackground from '../assets/images/menu_background.jpg';
import MenuTitle from '../assets/images/menu_title.png';

class MainMenu extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <ImageBackground source={MenuBackground} style={styles.container}>
                <StatusBar hidden={true} />
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                    <Image source={MenuTitle} style={styles.menuTitle} />
                </View>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                    <TouchableOpacity
                        style={styles.startBtn}
                        onPress={() => {this.props.navigation.navigate('GameScreen')}}
                    >
                        <Text style={styles.startText}>Start!</Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        )
    }
}

export default withNavigationFocus(MainMenu);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        resizeMode: 'contain'
    },
    menuTitle: {
        width: 300,
        height: 93,
    },
    startBtn: {
        backgroundColor: '#7dc242',
        width: 200,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 30
    },  
    startText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold'
    },
});