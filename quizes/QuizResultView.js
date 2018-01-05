/**
 * © 2017 Michal Rohac, All Rights Reserved.
 */

import React from "react";
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {StyleSheet, Text, View} from 'react-native'

import styling from "../utils/styling";
import * as Colors from "../utils/colors";
import AndroidButton from '../components/AndroidButton'
import * as RoutingConstants from './RoutingConstants'
import * as QuizActions from "./QuizActions";

class QuizResultView extends React.Component {
    handleRestartQuiz() {
        const {navigation, deck, resetQuiz} = this.props
        resetQuiz(deck.id)
        navigation.navigate(RoutingConstants.QUIZ_QUESTION_VIEW, {currentQuestionIndex: 0})
    }
    render() {
        const {deck, cards, quizStatus, backToDeck} = this.props
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
                <View style={styles.buttonBar}>
                    <AndroidButton
                        text="Back to Deck"
                        onPress={backToDeck}
                        styling={{
                            backgroundColor: Colors.white,
                            borderColor: Colors.black,
                            color: Colors.black,
                            fontSize: styling.defaultFontSize + 4
                        }}
                    />
                    <AndroidButton
                        text="Restart Quiz"
                        onPress={this.handleRestartQuiz.bind(this)}
                        styling={{
                            backgroundColor: Colors.black,
                            borderColor: Colors.black,
                            color: Colors.white,
                            fontSize: styling.defaultFontSize + 4
                        }}
                    />
                </View>
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

function mapDispatchToProps(dispatch) {
    return {
        ...bindActionCreators(QuizActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuizResultView)

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
    },
    buttonBar: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 20
    },
})
