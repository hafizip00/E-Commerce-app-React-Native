import { StyleSheet, Text, View, FlatList } from 'react-native'
import { useSelector } from 'react-redux'
import React, { useEffect } from 'react'

import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import CustomHeaderButton from '../../components/UI/HeaderButton'

import OrderItem from '../../components/shop/OrderItem'

const OrderScreen = ({ navigation }) => {

    const order = useSelector(state => state.orders.orders)

    useEffect(() => {
        navigation.setOptions({
            headerLeft: () => {
                return (
                    <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                        <Item title='Cart' iconName={Platform.OS === "android" ? "md-menu" : "ios-menu"}
                            onPress={() => { navigation.toggleDrawer() }} />
                    </HeaderButtons>
                )
            },
        });
    }, [navigation]);
    return (
        <FlatList
            data={order}
            keyExtractor={item => item.id}
            renderItem={itemData => <OrderItem
                amount={itemData.item.totalAmount}
                date={itemData.item.readableDate}
                items={itemData.item.items}
            />} />
    )
}

export default OrderScreen

const styles = StyleSheet.create({
    ItemList: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})