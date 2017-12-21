/**
 * © 2017 Michal Rohac, All Rights Reserved.
 */

import React from 'react'
import {StyleSheet, Text, View, Dimensions, StatusBar} from 'react-native'
import {connect} from 'react-redux'

import styling from '../utils/styling'

class Deck extends React.Component {
    render() {
        const {deck, cards, deckComponent} = this.props
        return (
            <View style={styles.deck}>
                <Text style={styles.title}>{deck.title}</Text>
                <Text style={styles.subtitle}>{`${cards} card${cards > 1 ? 's' : ''}`}</Text>
                {deckComponent && deckComponent(deck)}
            </View>
        )
    }
}

function mapStateToProps({decks, cards}, props) {
    return {
        deck: decks && props.id && decks[props.id] ? decks[props.id] : {
            id: props.id,
            title: "Unknown Deck"
        },
        cards: cards && props.id && cards[props.id] ? cards[props.id].length : 0
    }
}

export default connect(mapStateToProps)(Deck)

function deckHeight() {
    return (Dimensions.get('window').height - StatusBar.currentHeight - styling.tabNavigationHeight - styling.deckSpacing * styling.numberOfDecks) / styling.numberOfDecks
}

const styles = StyleSheet.create({
    deck: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#80e8ff',
        marginTop: styling.deckSpacing,
        height: deckHeight(),
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
        fontSize: styling.defaultFontSize + 2,
        fontWeight: 'bold'
    },
    subtitle: {
        color: '#808080',
    }
})