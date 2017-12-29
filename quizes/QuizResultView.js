/**
 * © 2017 Michal Rohac, All Rights Reserved.
 */

import React from "react";
import {Text, View} from 'react-native'

export default class QuizResultView extends React.Component {
    render() {
        const {navigation} = this.props
        const {quizStatus} = navigation.state.params
        return (
            <View>
                <Text>Quiz Result</Text>
                <Text>Correct answers: {quizStatus.success}</Text>
                <Text>Wrong answers: {quizStatus.fail}</Text>
            </View>
        )
    }
}
