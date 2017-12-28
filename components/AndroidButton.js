/**
 * © 2017 Michal Rohac, All Rights Reserved.
 */
import React from 'react'
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import * as Colors from '../utils/colors'
import styling from '../utils/styling'

export default (props) => {
    const {onPress, text, style, icon, styling} = props;
    return (
        <TouchableOpacity style={[styles.AndroidBtn, customizedAndroidBtnStyling(styling)]} onPress={onPress}>
            <View style={{flexDirection: 'row', alignItems: 'center', padding: 3}}>
                {icon && icon}
                <Text style={[styles.AndroidBtnText, customizedBtnTextStyling(styling)]}>{text}</Text>
            </View>
        </TouchableOpacity>
    )
}

function customizedAndroidBtnStyling(styling = {}) {
    const customStyling = {};
    if (styling.backgroundColor) customStyling.backgroundColor = styling.backgroundColor
    if (styling.borderColor) customStyling.borderColor = styling.borderColor
    return customStyling;
}

function customizedBtnTextStyling(styling = {}) {
    const customStyling = {};
    if (styling.color) customStyling.color = styling.color
    if (styling.fontSize) customStyling.fontSize = styling.fontSize
    return customStyling;
}

const styles = StyleSheet.create({
    reset: {
        textAlign: 'center',
        paddingLeft: 3
    },
    AndroidBtn: {
        // backgroundColor: Colors.white,
        backgroundColor:'transparent',
        margin: 5,
        padding: styling.defaultFontSize / 2,
        paddingLeft: styling.defaultFontSize,
        paddingRight: styling.defaultFontSize,
        height: styling.defaultFontSize * 3,
        borderColor: Colors.gray,
        borderWidth: 2,
        borderRadius: 2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    AndroidBtnText: {
        color: Colors.black,
        fontSize: styling.defaultFontSize + 2,
        textAlign: 'center',
        marginLeft: 2
    },

})

