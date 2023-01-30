import { Platform, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'

const CartITems = (props) => {
    const { quantity, productTitle, sum } = props.item
    const { onRemove, deletable } = props

    return (
        <View style={styles.cartItem}>
            <View style={styles.itemData}>
                <Text style={styles.quantity}>{quantity} </Text>
                <Text style={styles.maintext}>{productTitle}</Text>
            </View>
            <View style={styles.itemData}>
                <Text style={styles.maintext}>{sum.toFixed(2)}</Text>
                {deletable && <TouchableOpacity onPress={onRemove} style={styles.deleteButton}>
                    <Ionicons name={Platform.OS === "android" ? 'md-trash' : 'ios-trash'}
                        size={23}
                        color={"red"}
                    />
                </TouchableOpacity>}
            </View>
        </View>
    )
}

export default CartITems

const styles = StyleSheet.create({
    cartItem: {
        padding: 10,
        backgroundColor: "white",
        flexDirection: "row",
        justifyContent: "space-between",
        marginHorizontal: 20
    },
    itemData: {
        flexDirection: "row",
        alignItems: "center",
    },
    quantity: {
        fontFamily: "Roboto-Regular",
        color: "#888",
        fontSize: 16
    },
    maintext: {
        fontFamily: "Roboto-Bold",
        fontSize: 16,

    },
    deleteButton: {
        marginLeft: 20
    }
})