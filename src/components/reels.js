import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Text,
    Dimensions
} from 'react-native';
import ReelsIndividual from './reelsIndividual';

var MAX_WIDTH = Dimensions.get('screen').width;
var MAX_HEIGHT = Dimensions.get('screen').height;
var H_RATIO = Dimensions.get('screen').width / 667;

var REELS = 5;
var REELS_REPEAT = 10;
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
    [
        [0,0], [1,1], [2,2], [3,1], [4,0] //V top left
    ],   
    [
        [0,2], [1,1], [2,0], [3,1], [4,2] //V bottom left
    ], 
    [
        [0,0], [1,2], [2,0], [3,2], [4,0] //W top left
    ],     
    [
        [0,2], [1,0], [2,2], [3,0], [4,2] //M bottom left
    ],  
    [
        [0,2], [1,0], [2,2], [3,0], [4,2] //M top
    ],    
    [
        [0,0], [1,1], [2,0], [3,1], [4,0] //W top
    ],  
    [
        [0,1], [1,2], [2,1], [3,2], [4,1] //W bottom
    ],  
    [
        [0,2], [1,1], [2,2], [3,1], [4,2] //M bottom
    ],  
    [
        [0,0], [1,1], [2,1], [3,1], [4,0] //U top
    ],  
    [
        [0,1], [1,1], [2,1], [3,1], [4,1] //U bottom
    ],   
    [
        [0,2], [1,0], [2,0], [3,0], [4,2] //Inverse U bottom
    ],   
    [
        [0,1], [1,0], [2,0], [3,0], [4,1] //Inverse U top
    ],                                   
]

export default class Reels extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            width: null,
            height: null,
        }
        this.reels = [];
        this.reelsMotion= null;
        this.spinResults = [];
        this.winningLines = [];
    }

    randomBetween = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    highlightWinning = (current) => {
        if (!this.winningLines.length) {
            return;
        }
        if (current > 0) {
            LINES[this.winningLines[current - 1]].map((el) => {
                this.reels[el[0]].highlightIndex(el[1], false);
            });
        }
        if (current > this.winningLines.length -1) {
            return;
        }
        LINES[this.winningLines[current]].map((el) => {
            this.reels[el[0]].highlightIndex(el[1], true);
            this.reels[el[0]].shakeIndex(el[1]);
        });

        setTimeout(() => {
            this.highlightWinning(current + 1);
        }, 800);
    }

    evaluateResults = () => {
        this.winningLines = [];
        for (let lineIndex = 0; lineIndex < LINES.length; lineIndex++) {
            let streak = 0;
            let current = null;

            for (let coordIndex = 0; coordIndex < LINES[lineIndex].length; coordIndex++) {
                let coords = LINES[lineIndex][coordIndex];
                let symbolCoords = this.spinResults[coords[0]][coords[1]];

                if (coordIndex === 0) {
                    if (symbolCoords === 'R') {
                        break;
                    }
                    current = symbolCoords;
                    streak = 1;
                } else {
                    if (symbolCoords !== current) {
                        break;
                    }
                    streak += 1;
                }
            }
            if (streak >= 3) {
                this.winningLines.push(lineIndex);
            }
        }
        console.log(this.winningLines)
        this.highlightWinning(0);
    }

    spin = () => {
        this.reelsMotion = REELS;
        for (let i = 0; i < REELS; i++) {
            this.reels[i].scrollByOffset(this.randomBetween(
                (REELS_REPEAT - 8) * this.reels[i].symbols.length,
                (REELS_REPEAT - 2) * this.reels[i].symbols.length,
            ), (reelIndex, results) => {
                this.reelsMotion -= 1;
                this.spinResults[reelIndex] = results;

                if (this.reelsMotion === 0) {
                    this.evaluateResults();
                }
            });
        }
    }

    onLayout = (e) => {
        this.setState({
            width: e.nativeEvent.layout.width,
            height: e.nativeEvent.layout.height
        })
    }

    renderReels = () => {
        let reelWidth = this.state.width / REELS;
        let reelList = Array.apply(null, Array(REELS)).map((el, index) => {
            return (
                <ReelsIndividual width={reelWidth} height={this.state.height} key={index} index={index} ref={(ref) => { this.reels[index] = ref}} />
            )
        });
        return (
            <>
                {reelList}
            </>
        )
    }

    render() {
        return (
            <View style={styles.reelContainer} onLayout={this.onLayout}>
                {this.state.width && this.state.height && this.renderReels()}
            </View>
        )
    }
}

const styles = StyleSheet.create ({
    reelContainer: {
        flex: 1,
        flexDirection: 'row',
        marginTop: 20,
        marginBottom: 30,
        marginLeft: 10,
        marginRight: 10,       
    }
})