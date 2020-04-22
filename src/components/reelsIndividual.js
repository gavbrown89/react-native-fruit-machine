import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Text,
    Animated,
    Easing,
    Dimensions
} from 'react-native';
import Symbol from './symbol';

var REELS = 5;
var SYMBOLS = 3;
var REELS_REPEAT = 10;

var MAX_HEIGHT = Dimensions.get('screen').height;
var H_RATIO = Dimensions.get('screen').width / 667;

var SYMBOL_COLLECTION = [
	'7BCGLOMRWC7BRGLCGL7BRWOOM',
	'OWGC7RWOB7BCLOM7BGLRGMRLC',
	'C7LRGMRWOBCL7OWB7GOMLCBGR',
	'ROMLCGMR7OWB7C7LGBGRWOBCL',
	'LCGOWLB7CMGO7LROBCMR7BGRW',
];

var LINES = [
    [
        [0,0], [1,0], [2,0], [3,0], [4,0] //Top row
    ],
    [
        [0,1], [1,1], [2,1], [3,1], [4,1] //Middle row
    ],    
    [
        [0,2], [1,2], [2,2], [3,2], [4,2] //Bottom row
    ],     
]

export default class ReelsIndividual extends React.Component {
    constructor(props) {
        super(props);       
        this.symbols = SYMBOL_COLLECTION[this.props.index];
        this.reelSymbols = this.symbols.repeat(REELS_REPEAT).split("");
        this.symbolHeight = this.props.height / SYMBOLS;
        this.symbolRefs = [];
        this.position = this.reelSymbols.length - SYMBOLS;       
        this.currentScrollPos = (this.reelSymbols.length - SYMBOLS) * this.symbolHeight * -1;
        this.state = {
            scrollPos: new Animated.Value(this.currentScrollPos)
        }        
    }

    highlightIndex = (index, highlight) => {
        this.symbolRefs[this.position + index].setActive(highlight);
    }

    shakeIndex = (index) => {
        this.symbolRefs[this.position + index].shake();
    }

    scrollByOffset = (offset, callback) => {
        for (let i = 0; i < SYMBOLS; i++) {
            this.symbolRefs[this.position + i].setActive(true);
        }        
        this.currentScrollPos = this.currentScrollPos + (this.symbolHeight + offset) * 10;
        this.position = this.position - offset;
        Animated.timing (
            this.state.scrollPos,
            {
                toValue: this.currentScrollPos,
                duration: 750 + (this.props.index * 250),
                useNativeDriver: true,
                easing: Easing.inOut(Easing.ease)
            }
        ).start(() => {
            this.position = ((REELS_REPEAT - 2) * this.symbols.length) + (this.position % this.symbols.length);
            let results = [];
            for (let i = 0; i < SYMBOLS; i++) {
                this.symbolRefs[this.position + i].setActive(false);
                results.push(this.reelSymbols[this.position + i])
            }
            this.currentScrollPos = this.position * this.symbolHeight * -1;
            this.state.scrollPos.setValue(this.currentScrollPos);

            callback(this.props.index, results)
        });
    }   

    render() {
        return (
            <View style={[styles.reel, {width: this.props.width - 6, height: this.props.height}]}>
              <Animated.View style={{ width: this.props.width, height: this.reelSymbols.length * this.symbolHeight, transform: [{ translateY: this.state.scrollPos }] }}>
                {this.reelSymbols.map((el, index) =>{
                    return <Symbol symbol={el} key={index} index={index} width={this.props.width - 16} height={this.symbolHeight} ref={(ref) => {this.symbolRefs[index] = ref;}} />
                })}
              </Animated.View>
            </View>
        )
    }
}

const styles = StyleSheet.create ({
    reel: {
        overflow: 'hidden',
        backgroundColor: '#fff', 
        borderRadius: 10,
        marginLeft: 3,
        marginRight: 3,
        textAlign: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        
        elevation: 5,         
    }
})