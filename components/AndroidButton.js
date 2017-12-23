/**
 * © 2017 Michal Rohac, All Rights Reserved.
 */
import React from 'react'
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import * as Colors from '../utils/colors'
import styling from '../utils/styling'

export default (props) => {
    const {onPress, text, style, icon} = props;
    return (
        <TouchableOpacity style={styles.AndroidBtn} onPress={onPress}>
            <View style={{flexDirection: 'row', alignItems: 'center', padding: 3}}>
                {icon && icon}
                <Text style={styles.AndroidBtnText}>{text}</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    reset: {
        textAlign: 'center',
        paddingLeft: 3
    },
    AndroidBtn: {
        backgroundColor: Colors.white,
        padding: 10,
        paddingLeft: 30,
        paddingRight: 30,
        height: 45,
        borderColor: Colors.gray,
        borderWidth: 2,
        borderRadius: 2,
        alignSelf: 'flex-end',
        justifyContent: 'center',
        alignItems: 'center',
    },
    AndroidBtnText: {
        color: Colors.black,
        fontSize: styling.defaultFontSize + 2,
        textAlign: 'center',
    },

})

