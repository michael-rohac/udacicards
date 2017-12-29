/**
 * © 2017 Michal Rohac, All Rights Reserved.
 */
import React from "react";
import {StyleSheet, Text, View} from 'react-native'

import * as RoutingConstants from './RoutingConstants'
import {QUIZ_RESULT_VIEW} from './RoutingConstants'
import styling from "../utils/styling";
import Card from '../cards/Card'

export default class QuizQuestionView extends React.Component {
    state = {
        quizStatus: {
            success: 0,
            fail: 0
        }
    }
    goNext(cardStatus) {
        const {navigation} = this.props
        const {quizStatus} = this.state
        const {cards} = this.props.screenProps
        const currentQuestionIndex = navigation.state.params.currentQuestionIndex

        const newQuizStatus = {
            success: cardStatus ? quizStatus.success + 1 : quizStatus.success,
            fail: !cardStatus ? quizStatus.fail + 1 : quizStatus.fail
        }
        this.setState({
            quizStatus: newQuizStatus
        })

        if (currentQuestionIndex < cards.length - 1) {
            navigation.navigate(RoutingConstants.QUIZ_QUESTION_VIEW, {currentQuestionIndex: currentQuestionIndex + 1})
        } else {
            navigation.navigate(QUIZ_RESULT_VIEW, {quizStatus: newQuizStatus})
        }
    }

    render() {
        const {navigation} = this.props
        const {cards} = this.props.screenProps
        const currentQuestionIndex = navigation.state.params.currentQuestionIndex
        const card = currentQuestionIndex < cards.length ? cards[currentQuestionIndex] : undefined
        return (
            <View style={styles.container}>
                <Text style={[styles.text, styles.progressIndicator]}>
                    {currentQuestionIndex + 1} / {cards.length}
                </Text>
                {card && <Card card={card} goNext={this.goNext.bind(this)}/>}
                <View/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    text: {
        fontSize: styling.defaultFontSize
    },
    container: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    progressIndicator: {
        alignSelf: 'flex-start',
        justifyContent: 'flex-start',
        paddingLeft: 2
    }
})

