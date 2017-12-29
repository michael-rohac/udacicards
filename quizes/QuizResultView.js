/**
 * © 2017 Michal Rohac, All Rights Reserved.
 */

import React from "react";
import {connect} from 'react-redux'
import {StyleSheet, Text, View} from 'react-native'
import styling from "../utils/styling";
import * as Colors from "../utils/colors";

class QuizResultView extends React.Component {
    render() {
        const {deck, cards, quizStatus} = this.props
        const successPercentage = Math.round((quizStatus.correctAnswers / cards.length) * 10000) / 100
        return (
            <View style={styles.container}>
                <Text style={styles.title}>{deck.title} Quiz Result</Text>
                <View style={{borderColor: Colors.gray, borderBottomWidth: 2, borderTopWidth: 2, padding: 5}}>
                    <Text style={styles.text}>Correct answers: {quizStatus.correctAnswers}</Text>
                    <Text style={styles.text}>Wrong answers: {quizStatus.wrongAnswers}</Text>
                </View>
                <Text style={[styles.text, {color: successPercentage > 50 ? Colors.green : Colors.red}]}>
                    You've succeeded on {successPercentage}%
                </Text>
            </View>
        )
    }
}

function mapStateToProps({quizes}, props) {
    const {deck, cards} = props.screenProps
    return {
        ...props.screenProps,
        quizStatus: deck && quizes[deck.id] ? quizes[deck.id] : {}
    }
}

export default connect(mapStateToProps)(QuizResultView)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        height: (styling.defaultFontSize + 4) * 2,
        fontSize: styling.defaultFontSize + 4,
        fontWeight: 'bold',
        textAlign: 'center',
        margin: 5
    },
    text: {
        fontSize: styling.defaultFontSize + 4,
        textAlign: 'center',
        padding: 10
    }
})
