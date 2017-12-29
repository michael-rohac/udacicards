/**
 * © 2017 Michal Rohac, All Rights Reserved.
 */
import React from 'react'
import {Dimensions, StatusBar, StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import {connect} from 'react-redux'
import styling from '../utils/styling'
import * as Colors from '../utils/colors'

class Deck extends React.Component {
    render() {
        const {deck, cards, deckComponent, onPressHandler, numberOfDecksOnPage} = this.props
        return (
            <TouchableOpacity
                style={[styles.deck, {height: deckHeight(numberOfDecksOnPage || styling.defaultNumberOfDecks)}]}
                onPress={() => this.props.onPressHandler && onPressHandler(deck)}>
                <View>
                    <Text style={styles.title}>{deck.title}</Text>
                    <Text style={styles.subtitle}>{`${cards} card${cards > 1 ? 's' : ''}`}</Text>
                </View>
                {deckComponent && (
                    <View style={styles.deckComponent}>
                        {deckComponent(deck)}
                    </View>
                )}
            </TouchableOpacity>
        )
    }
}

function mapStateToProps({cards}, props) {
    const {deck} = props
    return {
        cards: cards && deck.id && cards[deck.id] ? cards[deck.id].length : 0
    }
}

export default connect(mapStateToProps)(Deck)

function deckHeight(numberOfDecks) {
    return (Dimensions.get('window').height - StatusBar.currentHeight - styling.tabNavigationHeight - styling.deckSpacing * numberOfDecks) / numberOfDecks
}

const styles = StyleSheet.create({
    deck: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: styling.deckBackgroundColor,
        marginTop: styling.deckSpacing,
        borderBottomWidth: 2,

        shadowColor: 'rgba(0, 0, 0, 0.24)',
        shadowOffset: {
            width: 0,
            height: 3
        },
        shadowRadius: 6,
        shadowOpacity: 1

    },
    title: {
        fontSize: styling.defaultFontSize + 4,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    subtitle: {
        fontSize: styling.defaultFontSize + 2,
        color: Colors.gray,
        textAlign: 'center'
    },
    deckComponent: {
        marginTop: 20
    }
})