import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import OrderScreen from '../screens/shop/OrderScreen'
import Colors from '../Constants/Colors'



const OrdersNavigator = () => {

    const OrdersNavigator = createNativeStackNavigator()
    return (
        <OrdersNavigator.Navigator>
            <OrdersNavigator.Screen name='Your Orders' component={OrderScreen}
                options={{
                    headerStyle: {
                        backgroundColor: Colors.primary,
                    },
                    headerTitleStyle: {
                        fontFamily: "Roboto-Regular",
                        color: "white"
                    }
                }}
            />
        </OrdersNavigator.Navigator>
    )
}

export default OrdersNavigator
