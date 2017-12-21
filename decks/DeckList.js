/**
 * © 2017 Michal Rohac, All Rights Reserved.
 */
import React from 'react'
import {FlatList, StyleSheet, View, Text, StatusBar} from 'react-native'
import {connect} from 'react-redux'
import Deck from './Deck'
import styling from "../utils/styling";

class DeckList extends React.Component {
    render() {
        const {decks, deckComponent} = this.props
        const renderDeck = ({item}) => {
            return (
                <Deck id={item.key} deckComponent={deckComponent}/>
            )
        }
        return (
            <View style={{flex: 1}}>
                <View style={{marginTop: styling.deckSpacing}}></View>
                <FlatList data={decks} renderItem={renderDeck} contentContainerStyle={{
                    flex: 1,
                    alignItems: 'stretch',
                    justifyContent: 'flex-start'
                }}/>
            </View>
        )
    }
}

function mapStateToProps({decks}) {
    return {
        decks: decks ? Object.keys(decks).map(deck => ({key: deck})) : []
    }
}

export default connect(mapStateToProps)(DeckList)
