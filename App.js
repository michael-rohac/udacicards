import React from 'react';
import {combineReducers, createStore} from 'redux'
import {Provider} from 'react-redux'
import {StyleSheet, View, Text} from 'react-native';

import {getReduxStateFromAsyncStorage, syncReduxStateWithAsyncStorage} from './utils/helpers'
import {LogerFactory, LOGGER_DEBUG} from './utils/logger'

import {decks} from './decks/DeckReducer'
import {fetchDecks} from './decks/DeckActions'
import DeckList from './decks/DeckList'

const logger = LogerFactory(LOGGER_DEBUG)
const reducer = combineReducers({decks})
const store = createStore(reducer);
store.subscribe(() => syncReduxStateWithAsyncStorage(store.getState()))

const p = getReduxStateFromAsyncStorage()
    .then(data => {
        logger.debug("Received data from AsyncStorage", data)
    })
    .catch(error => {
        logger.error(error)
    })

export default class App extends React.Component {
    componentDidMount() {
        getReduxStateFromAsyncStorage()
            .then((state) => {
                if (state && state.decks) {
                    store.dispatch(fetchDecks(state.decks))
                }
            })
            .catch((error) => {
                logger.error("Error in App#componentDidMount", error)
            })
    }
    render() {
        return (
            <Provider store={store}>
                <View style={styles.container}>
                    <DeckList/>
                </View>
            </Provider>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
