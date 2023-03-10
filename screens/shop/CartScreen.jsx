import { StyleSheet, Text, View, FlatList, Button, } from 'react-native'
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Colors from '../../Constants/Colors'
import CartITems from '../../components/shop/CartITems'
import * as Cartactions from '../../store/acitons/cart'
import * as OrderActions from '../../store/acitons/orders'

const CartScreen = () => {

    const dispatch = useDispatch()

    const totalAmount = useSelector(state => state.cart.totalAmount)
    const cartItems = useSelector(state => {
        const transformedCartItems = []
        for (const key in state.cart.items) {
            transformedCartItems.push({
                productId: key,
                productTitle: state.cart.items[key].productTitle,
                productPrice: state.cart.items[key].productPrice,
                quantity: state.cart.items[key].quantity,
                sum: state.cart.items[key].sum,
            })
        }
        return transformedCartItems.sort((a, b) => a.productId > b.productId ? 1 : -1)
    })
    return (
        <View style={styles.screen}>
            <View style={styles.summary}>
                <Text style={styles.summaryText}>Total : <Text style={styles.amount}>${Math.round(totalAmount.toFixed(2) * 100 / 100)}</Text></Text>
                <Button title='Order Now' color={Colors.accent} disabled={cartItems.length === 0}
                    onPress={() => {
                        dispatch(OrderActions.addOrder(cartItems, totalAmount))
                    }}
                />
            </View>
            <View>
                <FlatList data={cartItems} keyExtractor={item => item.productId}
                    renderItem={itemData => <CartITems item={itemData.item}
                        onRemove={() => dispatch(Cartactions.removeFromCart(itemData.item.productId))} deletable={true} />}
                />
            </View>
        </View>
    )
}

export default CartScreen

const styles = StyleSheet.create({
    screen: {
        margin: 20,

    },
    summary: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 20,
        padding: 10,
        shadowColor: "black",
        shadowOpacity: .6,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        elevation: 5,
        borderRadius: 10,
        backgroundColor: "white",
    },
    summaryText: {
        fontFamily: "Roboto-Bold",
        fontSize: 18,
    },
    amount: {
        color: Colors.primary,
    },
})