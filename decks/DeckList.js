/**
 * © 2017 Michal Rohac, All Rights Reserved.
 */
import React from 'react'
import {FlatList, View} from 'react-native'
import {connect} from 'react-redux'
import Deck from './Deck'
import styling from "../utils/styling";

class DeckList extends React.Component {
    render() {
        const {decks, onPressHandler} = this.props
        const renderDeck = ({item}) => {
            return (
                <Deck deck={item} onPressHandler={onPressHandler}/>
            )
        }
        return (
            <View style={{flex: 1}}>
                <View style={{marginTop: styling.deckSpacing}}></View>
                <FlatList data={decks}
                          keyExtractor={(deck) => deck.id}
                          renderItem={renderDeck}
                          contentContainerStyle={{
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
        decks: decks ? Object.keys(decks).map(deckId => decks[deckId]) : []
    }
}

export default connect(mapStateToProps)(DeckList)
