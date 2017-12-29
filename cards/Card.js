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
    state = {
        typedAnswer: '',
        showButtonBar: false,
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

    typeAnswer() {
        const {card} = this.props
        const {typedAnswer} = this.state
        if (card.answer && typedAnswer.length < card.answer.length) {
            const newTypedAnswer = typedAnswer + card.answer.substr(typedAnswer.length, 1)
            if (card.answer.length === newTypedAnswer.length) {
                setTimeout(this.showButtonBar.bind(this), 500)
            }
            this.setState({
                typedAnswer: newTypedAnswer
            })
        }
    }

    render() {
        const {card, goNext} = this.props
        const {typedAnswer, showButtonBar, status} = this.state
        if (card.answer && typedAnswer.length < card.answer.length) {
            setTimeout(this.typeAnswer.bind(this), 20)
        }
        return (
            <View style={styles.container}>
                <Text style={styles.question}>{card.question}</Text>
                <Text style={styles.answer}>{typedAnswer}</Text>
                {showButtonBar && (
                    <View style={styles.buttonBar}>
                        <AndroidButton
                            text="Correct"
                            styling={{
                                backgroundColor: Colors.green,
                                borderColor: Colors.green,
                                color: Colors.white
                            }}
                            onPress={() => this.showStatus(card.isCorrect)}
                        />
                        <AndroidButton
                            text="Incorrect"
                            styling={{
                                backgroundColor: Colors.red,
                                borderColor: Colors.red,
                                color: Colors.white
                            }}
                            onPress={() => this.showStatus(!card.isCorrect)}
                        />
                    </View>
                )}
                {status && (
                    <View style={{flexDirection: 'row'}}>
                        {status.ok && (
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
                        )}
                        {!status.ok && (
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
                        )}
                    </View>
                )}
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