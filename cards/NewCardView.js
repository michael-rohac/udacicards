/**
 * © 2017 Michal Rohac, All Rights Reserved.
 */
import React from 'react';
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {KeyboardAvoidingView, StyleSheet, Switch, Text, TextInput, View} from 'react-native';

import * as CardActions from './CardActions'
import AndroidButton from '../components/AndroidButton'
import styling from '../utils/styling';
import * as Colors from '../utils/colors';

class NewCardView extends React.Component {
    state = {
        question: '',
        answer: '',
        isCorrect: true
    }
    handleQuestionUpdate(question) {
        this.setState({question})
    }
    handleAnswerUpdate(answer) {
        this.setState({answer})
    }
    handleAnswerCorrectUpdate(isCorrect) {
        this.setState({isCorrect})
    }
    handleSubmit() {
        const {deck, addCard, navigation} = this.props
        const {question, answer, isCorrect} = this.state
        if (question && answer) {
            addCard(deck.id, {question, answer, isCorrect})
            navigation.goBack()
        }
    }
    render() {
        return (
            <KeyboardAvoidingView style={styles.container} behavior="padding">
                <Text style={styles.label}>What is your question?</Text>
                <TextInput
                    placeholder="Question"
                    multiline={true}
                    blurOnSubmit={true}
                    style={styles.textInput}
                    onChangeText={this.handleQuestionUpdate.bind(this)}
                    value={this.state.question}
                />
                <Text style={styles.label}>What is your proposed answer?</Text>
                <TextInput
                    placeholder="Answer"
                    multiline={true}
                    blurOnSubmit={true}
                    style={styles.textInput}
                    onChangeText={this.handleAnswerUpdate.bind(this)}
                    value={this.state.answer}
                />
                <View style={{flexDirection: 'row', marginTop: 10}}>
                    <Text style={[styles.label]}>Is answer correct? {this.state.isCorrect ? 'YES' : 'NO'}</Text>
                    <Switch
                        value={this.state.isCorrect}
                        onValueChange={this.handleAnswerCorrectUpdate.bind(this)}
                    />
                </View>
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
            </KeyboardAvoidingView>
        )
    }
}

function mapStateToProps({}, props) {
    const {navigation} = props
    return {
        ...navigation.state.params
    }
}

function mapDispatchToProps(dispatch) {
    return {
        ...bindActionCreators(CardActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewCardView)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    label: {
        fontSize: styling.defaultFontSize + 4,
        fontWeight: 'bold',
        textAlign: 'center',
        margin: 5
    },
    textInput: {
        fontSize: styling.defaultFontSize + 4,
        width:  (styling.defaultFontSize + 4) * 15,
        height: (styling.defaultFontSize + 4) * 4,
        borderColor: Colors.gray,
        borderWidth: 1,
        padding: 5
    }
})
