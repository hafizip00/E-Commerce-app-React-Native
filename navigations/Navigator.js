import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import Colors from '../Constants/Colors'
import ProductOverview from '../screens/shop/ProductOverview'
import ProductDetail from '../screens/shop/ProductDetail'
import CartScreen from '../screens/shop/CartScreen'


const Navigator = () => {

    const Stack = createNativeStackNavigator()

    return (
        <Stack.Navigator>
            <Stack.Screen name='Home' component={ProductOverview} options={{
                headerStyle: {
                    backgroundColor: Colors.primary,
                },
                headerTintColor: "white",
                headerTitleStyle: {
                    fontFamily: "Roboto-Regular",
                },
                headerBackTitleStyle: {
                    fontFamily: "Roboto-Regular",
                }
            }} />
            <Stack.Screen name='Product Detail' component={ProductDetail}
                options={{
                    headerTitleStyle: {
                        fontFamily: "Roboto-Regular",
                    },
                    headerBackTitleStyle: {
                        fontFamily: "Roboto-Regular",
                    }
                }} />

            <Stack.Screen name='Cart' component={CartScreen} />
        </Stack.Navigator>
    )
}

export default Navigator