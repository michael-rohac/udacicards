/**
 * © 2017 Michal Rohac, All Rights Reserved.
 */
import React from "react";
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {StyleSheet, Text, View} from 'react-native'

import * as QuizActions from './QuizActions'
import * as RoutingConstants from './RoutingConstants'
import {QUIZ_RESULT_VIEW} from './RoutingConstants'
import styling from "../utils/styling";
import Card from '../cards/Card'

class QuizQuestionView extends React.Component {
    goNext(cardStatus) {
        const {navigation, deck, cards, currentQuestionIndex, quizStatus, updateQuiz} = this.props

        updateQuiz(deck.id, {
            correctAnswers: quizStatus.correctAnswers + (cardStatus ? 1 : 0),
            wrongAnswers: quizStatus.wrongAnswers + (!cardStatus ? 1 : 0)
        })

        if (currentQuestionIndex < cards.length - 1) {
            navigation.navigate(RoutingConstants.QUIZ_QUESTION_VIEW, {currentQuestionIndex: currentQuestionIndex + 1})
        } else {
            navigation.navigate(QUIZ_RESULT_VIEW)
        }
    }

    render() {
        const {navigation, cards, currentQuestionIndex} = this.props
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

function mapStateToProps({quizes}, props) {
    const {navigation} = props
    const {deck, cards} = props.screenProps
    return {
        ...props.screenProps, ...navigation.state.params,
        quizStatus: deck && quizes[deck.id] ? quizes[deck.id] : {}
    }
}

function mapDispatchToProps(dispatch) {
    return {
        ...bindActionCreators(QuizActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuizQuestionView)

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

