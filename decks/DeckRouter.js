/**
 * © 2017 Michal Rohac, All Rights Reserved.
 */
import React from 'react'
import {StyleSheet, Text, View} from 'react-native'
import {StackNavigator} from 'react-navigation'
import {MaterialCommunityIcons, MaterialIcons} from '@expo/vector-icons'
import {black, gray, white} from '../utils/colors'

import DeckList from './DeckList'
import AndroidButton from '../components/AndroidButton'

export default () => {
    return (
        <DecksNavigator/>
    )
}

const styles = StyleSheet.create({
    navigationHeader: {
        backgroundColor: black
    }
})

const DecksNavigator = StackNavigator({
    DeckList: {
        screen: ({navigation}) =>
            <View style={{flex: 1}}>
                <DeckList deckComponent={(deck) =>
                    <View style={{flexDirection: 'row'}}>
                        <AndroidButton
                            icon={<MaterialCommunityIcons name='playlist-plus' size={20}/>}
                            text={`Add Card`}
                            onPress={() => navigation.navigate('DeckView', {...deck})}/>
                        <AndroidButton
                            icon={<MaterialCommunityIcons name='play-circle-outline' size={20}/>}
                            text={`Start Quiz`}
                            onPress={() => navigation.navigate('QuizView', {...deck})}/>

                    </View>
                }/>
            </View>,
        navigationOptions: {
            title: 'Deck List',
            headerStyle: [styles.navigationHeader, {
                height: 0,
            }],
            headerTintColor: white,
            headerPressColorAndroid: gray
        }
    },
    DeckView: {
        screen: ({navigation}) => <View><Text>{navigation.state.params.title} Cards</Text></View>,
        navigationOptions: ({navigation}) => ({
            title: `${navigation.state.params.title}`,
            headerStyle: styles.navigationHeader,
            headerTintColor: white,
            headerPressColorAndroid: gray
        })
    },
    QuizView: {
        screen: () => <View><Text>Quiz View</Text></View>,
        navigationOptions: ({navigation}) => ({
            title: `${navigation.state.params.title} Quiz`,
            headerStyle: styles.navigationHeader,
            headerTintColor: white,
            headerPressColorAndroid: gray
        })
    }
})

