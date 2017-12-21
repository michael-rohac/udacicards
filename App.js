import React from 'react';
import {combineReducers, createStore} from 'redux'
import {Provider} from 'react-redux'
import {StyleSheet, View, Text, StatusBar} from 'react-native';
import { TabNavigator, StackNavigator } from 'react-navigation'

import {removeReduxStateFromAsyncStorage, getReduxStateFromAsyncStorage, syncReduxStateWithAsyncStorage} from './utils/helpers'
import {LogerFactory, LOGGER_DEBUG} from './utils/logger'

import {decks} from './decks/DeckReducer'
import {cards} from './cards/CardReducer'
import {fetchDecks} from './decks/DeckActions'
import {fetchCards} from './cards/CardActions'
import DeckList from './decks/DeckList'
import styling from './utils/styling'

const logger = LogerFactory(LOGGER_DEBUG)
const reducer = combineReducers({decks, cards})
const store = createStore(reducer);
store.subscribe(() => syncReduxStateWithAsyncStorage(store.getState()))

removeReduxStateFromAsyncStorage()

const customDecksComponent = () => <Text>custom decks component</Text>
const customCardsComponent = () => <Text>custom cards component</Text>
const customQuizesComponent = () => <Text>custom quizes component</Text>

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#fff',
        alignItems: 'stretch',
        justifyContent: 'center',
    },
    tabStyle: {
        height: styling.tabNavigationHeight,
        shadowColor: 'rgba(0, 0, 0, 0.24)',
        shadowOffset: {
            width: 0,
            height: 3
        },
        shadowRadius: 6,
        shadowOpacity: 1
    }
});

const Tabs = TabNavigator({
    DECKS: {
        screen: () => <DeckList deckComponent={customDecksComponent}/>,
        navigationOptions: {
            tabBarLabel: 'DECKS',
            style: styles.tabStyle
        }
    },
    CARDS: {
        screen: () => <DeckList deckComponent={customCardsComponent}/>,
        navigationOptions: {
            tabBarLabel: 'CARDS',
            style: styles.tabStyle
        }
    },
    QUIZES: {
        screen: () => <DeckList deckComponent={customQuizesComponent}/>,
        navigationOptions: {
            tabBarLabel: 'QUIZES',
            style: styles.tabStyle
        }
    }
})


export default class App extends React.Component {
    componentDidMount() {
        getReduxStateFromAsyncStorage()
            .then((state) => {
                if (state && state.decks) {
                    store.dispatch(fetchDecks(state.decks))
                }
                if (state && state.cards) {
                    for (const deck of Object.keys(state.cards)) {
                        store.dispatch(fetchCards(deck, state.cards[deck]))
                    }
                }
            })
            .catch((error) => {
                logger.error("Error in App#componentDidMount", error)
            })
    }
    render() {
        return (
            <Provider store={store}>
                <View style={[styles.container, {marginTop: StatusBar.currentHeight}]}>
                    <Tabs/>
                </View>
            </Provider>
        );
    }
}
