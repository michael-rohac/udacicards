/**
 * © 2017 Michal Rohac, All Rights Reserved.
 */
import React from 'react'
import {StyleSheet, Text, View} from 'react-native'
import {FontAwesome} from '@expo/vector-icons'

import AndroidButton from '../components/AndroidButton'
import styling from '../utils/styling'
import * as Colors from '../utils/colors'

export default class Card extends React.Component {
    constructor(props) {
        super(props)
        this.showButtonBar.bind(this)
        this.showStatus.bind(this)
        this.showAnswer.bind(this)
    }
    state = {
        showAnswer: false,
        status: undefined
    }
    showButtonBar() {
        this.setState({
            showButtonBar: true
        })
    }
    showStatus(ok) {
        this.setState({
            showButtonBar: false,
            status: {ok}
        })
    }

    showAnswer() {
        this.setState({showAnswer: true})
    }
    answerComponent() {
        const {card} = this.props
        const {showAnswer, status} = this.state
        return showAnswer ? (
            <View>
                <Text style={styles.answer}>{card.answer}</Text>
                <View style={styles.buttonBar}>
                    <AndroidButton
                        text="Correct"
                        disabled={status ? true : false}
                        styling={{
                            backgroundColor: Colors.green,
                            borderColor: Colors.green,
                            color: Colors.white
                        }}
                        onPress={() => this.showStatus(card.isCorrect)}
                    />
                    <AndroidButton
                        text="Incorrect"
                        disabled={status ? true : false}
                        styling={{
                            backgroundColor: Colors.red,
                            borderColor: Colors.red,
                            color: Colors.white
                        }}
                        onPress={() => this.showStatus(!card.isCorrect)}
                    />
                </View>
            </View>
        ) : (
            <AndroidButton
                text="Answer"
                onPress={() => this.showAnswer()}
                styling={{
                    backgroundColor: Colors.green,
                    borderColor: Colors.green,
                    color: Colors.white,
                    fontSize: styling.defaultFontSize + 4
                }}
            />
        )
    }
    statusComponent() {
        const {goNext} = this.props
        const {status} = this.state
        if (!status) return
        return status.ok ? (
            <View style={[styles.statusBar, {backgroundColor: Colors.green}]}>
                <AndroidButton
                    icon={<FontAwesome name='check' size={STATUS_FONT_SIZE} style={styles.correct}/>}
                    text='YES!   GO NEXT >>'
                    onPress={() => goNext(status.ok)}
                    styling={{
                        fontSize: STATUS_FONT_SIZE,
                        color: Colors.white,
                        backgroundColor: Colors.green,
                        borderColor: Colors.green
                    }}
                />
            </View>
        ) : (
            <View style={[styles.statusBar, {backgroundColor: Colors.red}]}>
                <AndroidButton
                    icon={<FontAwesome name='exclamation-circle' size={STATUS_FONT_SIZE} style={styles.incorrect}/>}
                    text=' NO!   GO NEXT >>'
                    onPress={() => goNext(status.ok)}
                    styling={{
                        fontSize: STATUS_FONT_SIZE,
                        color: Colors.white,
                        backgroundColor: Colors.red,
                        borderColor: Colors.red
                    }}
                />
            </View>
        )
    }
    render() {
        const {card} = this.props
        return (
            <View style={styles.container}>
                <Text style={styles.question}>{card.question}</Text>
                {this.answerComponent()}
                {this.statusComponent()}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center'
    },
    question: {
        minHeight: (styling.defaultFontSize + 4) * 2,
        fontSize: styling.defaultFontSize + 4,
        textAlign: 'center',
        margin: 5
    },
    answer: {
        minHeight: (styling.defaultFontSize + 4) * 2,
        fontSize: styling.defaultFontSize + 4,
        textAlign: 'center',
        margin: 5,
    },
    buttonBar: {
        marginTop: 20
    },
    statusBar: {
        marginTop: 20,
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center'
    },
    incorrect: {
        backgroundColor: Colors.red,
        color: Colors.white,
    },
    correct: {
        backgroundColor: Colors.green,
        color: Colors.white,
    }
})

const STATUS_FONT_SIZE = styling.defaultFontSize + 4