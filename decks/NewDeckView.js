/**
 * © 2017 Michal Rohac, All Rights Reserved.
 */
import React from 'react';
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {StyleSheet, Text, TextInput, View} from 'react-native';

import AndroidButton from '../components/AndroidButton'
import * as DeckActions from '../decks/DeckActions'
import styling from '../utils/styling';
import * as Colors from '../utils/colors';

class NewDeckView extends React.Component {
    state = {
        deckTitle: ''
    }
    handleDeckTitleUpdate(deckTitle) {
        this.setState({deckTitle})
    }
    handleSubmit() {
        const {navigation, addDeck} = this.props
        const {deckTitle} = this.state
        debugger
        if (deckTitle) {
            addDeck(deckTitle)
            navigation.navigate('DECKS')
        }
    }
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>What is the title of your new deck?</Text>
                <TextInput
                    placeholder="Deck Title"
                    style={styles.textInput}
                    onChangeText={this.handleDeckTitleUpdate.bind(this)}
                    value={this.state.deckTitle}
                />
                <View style={{marginTop: 20}}>
                    <AndroidButton
                        text="Submit"
                        onPress={this.handleSubmit.bind(this)}
                        styling={{
                            backgroundColor: Colors.black,
                            borderColor: Colors.black,
                            color: Colors.white,
                            fontSize: styling.defaultFontSize + 4
                        }}
                    />
                </View>
            </View>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return {
        ...bindActionCreators(DeckActions, dispatch)
    }
}
export default connect(null, mapDispatchToProps)(NewDeckView)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        height: (styling.defaultFontSize + 4) * 2,
        fontSize: styling.defaultFontSize + 4,
        textAlign: 'center',
        margin: 5
    },
    text: {
        fontSize: styling.defaultFontSize + 4,
        textAlign: 'center',
        padding: 10
    },
    textInput: {
        fontSize: styling.defaultFontSize + 4,
        width:  (styling.defaultFontSize + 4) * 15,
        borderColor: Colors.gray,
        borderWidth: 1,
        padding: 5
    }
})