/**
 * © 2017 Michal Rohac, All Rights Reserved.
 */

import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { connect } from 'react-redux'

class Deck extends React.Component {
    render() {
        const {deck} = this.props
        return (
            <View style={styles.deck}>
                <Text>{deck.title}</Text>
            </View>
        )
    }
}

function mapStateToProps({decks}, props) {
    debugger
    return {
        deck: decks && props.id && decks[props.id] ? decks[props.id] : {
            id: props.id,
            title: "Unknown Deck"
        }
    }
}

export default connect(mapStateToProps)(Deck)

const styles = StyleSheet.create({
    deck: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        height: 50,
        borderColor: '#4c4c4c',
        borderBottomWidth: 2
    }
})