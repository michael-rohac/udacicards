/**
 * © 2017 Michal Rohac, All Rights Reserved.
 */

import React from 'react'
import {connect} from 'react-redux'
import {StyleSheet, Text, View} from 'react-native'
import {StackNavigator} from 'react-navigation'

import Card from '../cards/Card'
import styling from '../utils/styling'

class QuizView extends React.Component {
    render() {
        const {cards} = this.props
        return (
            <QuizNavigator screenProps={{cards}}/>
        )
    }
}

function mapStateToProps({cards}, props) {
    const {deck} = props
    return {
        cards: cards && deck.id && cards[deck.id] ? cards[deck.id].length : 0
    }
}

function mapStateToProps({cards}, props) {
    const {deck} = props
    return {
        cards: cards && cards[deck.id] ? cards[deck.id] : []
    }
}

export default connect(mapStateToProps)(QuizView)

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

class CardView extends React.Component {
    state = {
        quizStatus: {
            success: 0,
            fail: 0
        }
    }
    goNext(cardStatus) {
        const {navigation} = this.props
        const {cards} = this.props.screenProps
        const currentQuestionIndex = navigation.state.params.currentQuestionIndex

        this.setState(({quizStatus}) => ({
            quizStatus: {
                success: cardStatus ? quizStatus.success + 1 : quizStatus.success,
                fail: !cardStatus ? quizStatus.fail + 1 : quizStatus.fail
            }
        }))

        if (currentQuestionIndex < cards.length - 1) {
            navigation.navigate('CardView', {currentQuestionIndex: currentQuestionIndex + 1})
        } else {
            navigation.navigate('QuizResult')
        }
    }
    render() {
        const {navigation} = this. props
        const {cards} = this.props.screenProps
        const currentQuestionIndex = navigation.state.params.currentQuestionIndex
        const card = currentQuestionIndex < cards.length ? cards[currentQuestionIndex] : undefined
        return (
            <View style={styles.container}>
                <Text style={[styles.text, styles.progressIndicator]}>
                    {currentQuestionIndex + 1} / {cards.length}
                </Text>
                {card && <Card card={card} goNext={this.goNext.bind(this)} />}
                <View/>
            </View>
        )
    }
}

const QuizNavigator = StackNavigator({
    CardView: {
        screen: CardView
    },
    QuizResult: {
        screen: () => <Text>Result</Text>
    }
}, {
    headerMode: 'none',
    mode: 'modal',
    navigationOptions: {
        gesturesEnabled: false,
    },
    initialRouteName: 'CardView',
    initialRouteParams: {
        currentQuestionIndex: 0
    },
})

const prevGetStateForAction = QuizNavigator.router.getStateForAction;
QuizNavigator.router.getStateForAction = (action, state) => {
    // disable go back (it's possible using SW/HW BACK BUTTON)
    return action.type === 'Navigation/BACK' ? state : prevGetStateForAction(action, state)
};