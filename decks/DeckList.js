/**
 * © 2017 Michal Rohac, All Rights Reserved.
 */
import React from 'react'
import {FlatList, View} from 'react-native'
import {connect} from 'react-redux'
import Deck from './Deck'

class DeckList extends React.Component {
    render() {
        const {decks} = this.props
        const renderDeck = ({item}) => {
            return (
                <Deck id={item.key}/>
            )
        }
        return (
            <View>
                <FlatList data={decks} renderItem={renderDeck}/>
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

