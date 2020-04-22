import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Text,
    Image,
    Animated,
} from 'react-native';

var REELS = 5;
var SYMBOLS = 3;

const Images = {
    seven: require('../assets/images/777.png'),
    bananas: require('../assets/images/bananas.png'),
    bar: require('../assets/images/bar.png'),   
    bigwin: require('../assets/images/bigwin.png'), 
    cherrys: require('../assets/images/cherrys.png'),
    grape: require('../assets/images/grape.png'),
    lemon: require('../assets/images/lemon.png'),
    orange: require('../assets/images/orange.png'),
    watermelon: require('../assets/images/watermelon.png'),
}

export default class Symbol extends React.Component {
    constructor(props) {
        super(props);

        this.symbolHeight = this.props.height / SYMBOLS;
        this.state = {
            active: true,
            animationValue: new Animated.Value(0),
        }
    }

    getImages = () => {
        switch(this.props.symbol) {
            case "7":
                return Images.seven;
                break;
            case "B":
                return Images.bananas;
                break; 
            case "R":
                return Images.bar;
                break;  
            case "W":
                return Images.bigwin;
                break;    
            case "C":
                return Images.cherrys;
                break; 
            case "G":
                return Images.grape;
                 break;   
            case "L":
                return Images.lemon;
                break;
            case "O":
                return Images.orange;
                break;
            case "M":
                return Images.watermelon;
                break;                                                                                                                              
        }
    }

    shake = () => {
        this.state.animationValue.setValue(0);
        Animated.timing(
            this.state.animationValue,
            {
                toValue: 1,
                duration: 750,
                useNativeDriver: true,
            }
        ).start();
    }

    setActive = (active) => {
        this.setState({
            active: active
        });
    }

    render() {
        let sourceSymbol = this.getImages();
        let animatedSymbol = [
            {
                scale: this.state.animationValue.interpolate({
                    inputRange: [0, 0.25, 0.5, 1],
                    outputRange: [1, 1.25, 0.75, 1]
                })
            },
            {
                rotate: this.state.animationValue.interpolate({
                    inputRange: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
                    outputRange: ['0deg', '15deg', '0deg', '-15deg', '0deg', '15deg', '0deg', '-15deg', '0deg', '15deg', '0deg']                    
                })
            }
        ];
        return (
            <View style={[styles.symbol, {width: this.props.width, height: this.props.height}]}>
                <Animated.Image style={{ width: this.props.width - 20, height: this.props.height - 20, opacity: this.state.active ? 1 : 0.5, transform: animatedSymbol}} resizeMode='contain' source={sourceSymbol} />
            </View>
        )
    }
}

const styles = StyleSheet.create ({
    symbol: {
        padding: 20,
    }
})