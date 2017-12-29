/**
 * © 2017 Michal Rohac, All Rights Reserved.
 */

import React from 'react'
import {connect} from 'react-redux'
import {StyleSheet} from 'react-native'
import {StackNavigator} from 'react-navigation'
import QuizQuestionView from './QuizQuestionView'
import QuizResultView from './QuizResultView'
import styling from '../utils/styling'
import * as RoutingConstants from './RoutingConstants'

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

const QuizNavigator = StackNavigator({
    [RoutingConstants.QUIZ_QUESTION_VIEW]: {
        screen: QuizQuestionView
    },
    [RoutingConstants.QUIZ_RESULT_VIEW]: {
        screen: QuizResultView
    }
}, {
    headerMode: 'none',
    navigationOptions: {
        gesturesEnabled: false,
    },
    initialRouteName: 'QuizQuestionView',
    initialRouteParams: {
        currentQuestionIndex: 0
    },
})

const prevGetStateForAction = QuizNavigator.router.getStateForAction;
QuizNavigator.router.getStateForAction = (action, state) => {
    // disable go back (it's possible using SW/HW BACK BUTTON)
    return action.type === 'Navigation/BACK' ? state : prevGetStateForAction(action, state)
};