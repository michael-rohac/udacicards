/**
 * © 2017 Michal Rohac, All Rights Reserved.
 */

import React from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {StackNavigator} from 'react-navigation'
import * as QuizActions from './QuizActions'
import QuizQuestionView from './QuizQuestionView'
import QuizResultView from './QuizResultView'
import * as RoutingConstants from './RoutingConstants'

class QuizView extends React.Component {
    componentDidMount() {
        const {deck, resetQuiz} = this.props
        resetQuiz(deck.id)
    }
    render() {
        const {cards, deck} = this.props
        return (
            <QuizNavigator screenProps={{deck, cards}}/>
        )
    }
}

function mapStateToProps({cards}, props) {
    const {deck} = props
    return {
        cards: cards && cards[deck.id] ? cards[deck.id] : []
    }
}

function mapDispatchToProps(dispatch) {
    return {
        ...bindActionCreators(QuizActions, dispatch)
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(QuizView)

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