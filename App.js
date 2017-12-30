import React from 'react';
import {combineReducers, createStore} from 'redux'
import {Provider} from 'react-redux'
import {StatusBar, StyleSheet, View} from 'react-native';
import {TabNavigator} from 'react-navigation'

import {
    getReduxStateFromAsyncStorage, removeReduxStateFromAsyncStorage,
    syncReduxStateWithAsyncStorage
} from './utils/helpers'
import {LogerFactory, LOGGER_DEBUG} from './utils/logger'

import {decks} from './decks/DeckReducer'
import {cards} from './cards/CardReducer'
import {quizes} from './quizes/QuizReducer'
import {fetchDecks} from './decks/DeckActions'
import {fetchCards} from './cards/CardActions'
import DeckRouter from './decks/DeckRouter'
import NewDeckView from './decks/NewDeckView'
import styling from './utils/styling'

const logger = LogerFactory(LOGGER_DEBUG)
const reducer = combineReducers({decks, cards, quizes})
const store = createStore(reducer);
store.subscribe(() => syncReduxStateWithAsyncStorage(store.getState()))

// use this only in DEV mode in order to clean AsyncStore and start always with initial data
// removeReduxStateFromAsyncStorage()

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

const MainNavigator = TabNavigator({
    DECKS: {
        screen: () => <DeckRouter/>,
        navigationOptions: {
            tabBarLabel: 'DECKS',
            style: styles.tabStyle
        }
    },
    NEW_DECK: {
        screen: NewDeckView,
        navigationOptions: {
            tabBarLabel: 'NEW DECK',
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
                    <MainNavigator/>
                </View>
            </Provider>
        );
    }
}
