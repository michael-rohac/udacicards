/**
 * © 2017 Michal Rohac, All Rights Reserved.
 */
import React from 'react'

import {MaterialCommunityIcons, MaterialIcons} from '@expo/vector-icons'
import AndroidButton from '../components/AndroidButton'

import * as Colors from '../utils/colors'
import Deck from './Deck'
import * as RoutingConstants from './RoutingConstants'
import {View} from 'react-native'

export default (props) => {
    const {deck, navigation} = props;
    return (
        <Deck style={{height: 400}}
              deck={deck}
              numberOfDecksOnPage={1}
              deckComponent={(deck) =>
                  <View>
                      <AndroidButton
                          icon={<MaterialCommunityIcons name='playlist-plus' size={20}/>}
                          text={`Add Card`}
                          styling={{
                              backgroundColor: Colors.white,
                              borderColor: Colors.black,
                              color: Colors.black
                          }}
                          onPress={() => navigation.navigate(RoutingConstants.DECK_CARD_VIEW, {deck})}/>
                      <AndroidButton
                          icon={<MaterialCommunityIcons name='play-circle-outline' size={20} style={{color: Colors.white}}/>}
                          text={`Start Quiz`}
                          styling={{
                              backgroundColor: Colors.black,
                              borderColor: Colors.black,
                              color: Colors.white
                          }}
                          onPress={() => navigation.navigate(RoutingConstants.QUIZ_VIEW, {deck})}/>

                  </View>}/>
    )
}
