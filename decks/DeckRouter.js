/**
 * © 2017 Michal Rohac, All Rights Reserved.
 */
import React from 'react'
import {StyleSheet, View} from 'react-native'
import {StackNavigator} from 'react-navigation'
import {MaterialCommunityIcons, MaterialIcons} from '@expo/vector-icons'
import {black, gray, white} from '../utils/colors'

import * as RoutingConstants from './RoutingConstants'
import DeckList from './DeckList'
import DeckView from './DeckView'
import QuizView from '../quizes/QuizView'
import NewCardView from '../cards/NewCardView'

export default (props) => {
    const {deck} = props
    const DecksNavigator = createDeckNavigator(deck)
    return (<DecksNavigator/>)
}

const styles = StyleSheet.create({
    navigationHeader: {
        backgroundColor: black
    }
})

function createDeckNavigator(initialDeck) {
    return StackNavigator({
            [RoutingConstants.DECK_LIST_VIEW]: {
                screen: ({navigation}) =>
                    <View style={{flex: 1}}>
                        <DeckList
                            initialDeck={initialDeck}
                            onPressHandler={(deck) => navigation.navigate(RoutingConstants.DECK_VIEW, {deck})}/>
                    </View>,
                navigationOptions: {
                    title: 'Deck List',
                    headerStyle: [styles.navigationHeader, {
                        height: 0,
                    }],
                    headerTintColor: white,
                    headerPressColorAndroid: gray
                }
            },
            [RoutingConstants.DECK_VIEW]: {
                screen: ({navigation}) => <DeckView navigation={navigation} deck={navigation.state.params.deck}/>,
                navigationOptions: ({navigation}) => ({
                    title: `${navigation.state.params.deck.title}`,
                    headerStyle: styles.navigationHeader,
                    headerTintColor: white,
                    headerPressColorAndroid: gray
                })
            },
            [RoutingConstants.DECK_CARD_VIEW]: {
                screen: NewCardView,
                navigationOptions: ({navigation}) => ({
                    title: `Add ${navigation.state.params.deck.title} Card`,
                    headerStyle: styles.navigationHeader,
                    headerTintColor: white,
                    headerPressColorAndroid: gray
                })
            },
            [RoutingConstants.QUIZ_VIEW]: {
                screen: ({navigation}) => <QuizView deck={navigation.state.params.deck} backToDeck={() => navigation.goBack()}/>,
                navigationOptions: ({navigation}) => ({
                    title: `${navigation.state.params.deck.title} Quiz`,
                    headerStyle: styles.navigationHeader,
                    headerTintColor: white,
                    headerPressColorAndroid: gray
                })
            }
        },
/*
        // this causes issue with no way how to get back from DECK_VIEW to DECK_LIST_VIEW
        {
            initialRouteName: initialDeck ? RoutingConstants.DECK_VIEW : RoutingConstants.DECK_LIST_VIEW,
            initialRouteParams: initialDeck ? {deck: initialDeck, initialDeck: true} : null
        }
*/
        )
}