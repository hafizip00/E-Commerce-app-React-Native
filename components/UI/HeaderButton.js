import { Platform, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { HeaderButton } from 'react-navigation-header-buttons'
import { Ionicons } from '@expo/vector-icons'
import Colors from '../../Constants/Colors'
const CustomHeaderButton = (props) => {
    return <HeaderButton {...props} IconComponent={Ionicons} iconSize={23}
        color={Platform.OS === "android" ? "white" : Colors.primary} />
}

export default CustomHeaderButton