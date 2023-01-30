import { Button, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'

import Colors from '../../Constants/Colors'
import CartItem from '../../components/shop/CartITems'
import { FlatList } from 'react-native-gesture-handler'
const OrderItem = (props) => {
    const [showDetails, setShowDetails] = useState(false)
    return (
        <View style={styles.orderItem}>
            <View style={styles.summary}>
                <Text style={styles.totalAmount}>{props.amount.toFixed(2)}</Text>
                <Text style={styles.date}>{props.date}</Text>
            </View>
            <Button title={`${showDetails ? "Hide" : "Show"}` + " Details"} color={Colors.primary}
                onPress={() => {
                    setShowDetails(prev => !prev)
                }}
            />
            {showDetails && <View style={styles.detailsContainer}>
                <FlatList
                    data={props.items}
                    renderItem={(itemData) => <CartItem item={itemData.item} />}
                    key={new Date().toLocaleString()}
                />
            </View>}
        </View>
    )
}

export default OrderItem

const styles = StyleSheet.create({
    orderItem: {
        shadowColor: "black",
        shadowOpacity: .6,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        elevation: 5,
        borderRadius: 10,
        backgroundColor: "white",
        margin: 20,
        padding: 10,
    },
    summary: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        marginBottom: 15
    },
    totalAmount: {
        fontFamily: "Roboto-Bold",
        fontSize: 16,
    },
    date: {
        fontSize: 16,
        fontFamily: "Roboto-Regular",
        color: "#888"
    },
    detailsContainer: {
        width: "100%",
        marginVertical: 10
    }

})