import { StyleSheet, Text, View, Image, Button, TouchableOpacity, TouchableNativeFeedback, Platform } from 'react-native'
import React from 'react'
import Colors from '../../Constants/Colors'

const ProductItem = (props) => {
    let TouchableComponent = (Platform.OS === 'android' && Platform.Version >= 21) ? TouchableNativeFeedback : TouchableOpacity
    const { image, title, price } = props
    return (
        <View style={styles.product}>
            <View style={styles.touchable}>
                <TouchableComponent onPress={props.onSelect}>
                    <View>
                        <View style={styles.imageContainer}>
                            <Image source={{ uri: image }} style={styles.image} />
                        </View>
                        <View style={styles.detail}>
                            <Text style={styles.title}>{title}</Text>
                            <Text style={styles.price}>${price.toFixed(2)}</Text>
                        </View>
                        <View style={styles.actions}>
                            {props.children}
                        </View>
                    </View>
                </TouchableComponent>
            </View>
        </View>
    )
}

export default ProductItem

const styles = StyleSheet.create({
    product: {
        shadowColor: "black",
        shadowOpacity: .6,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        elevation: 5,
        borderRadius: 10,
        backgroundColor: "white",
        height: 300,
        margin: 20,
    },
    touchable: {
        borderRadius: 10,
        overflow: "hidden",
    },
    detail: {
        alignItems: "center",
        height: "20%",
        padding: 10,
    },
    imageContainer: {
        width: "100%",
        height: "55%",
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        overflow: "hidden",
    },
    image: {
        width: "100%",
        height: "100%"
    },
    title: {
        fontSize: 18,
        marginVertical: 4,
        fontFamily: "Roboto-Bold",
    },
    price: {
        fontSize: 14,
        color: "#888",
        fontFamily: "Roboto-Regular",
    },
    actions: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        height: "25%",
        padding: 20,
    },
})