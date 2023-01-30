import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import UserProduct from '../screens/user/UserProduct'
import EditUserProduct from '../screens/user/EditProductScreen'
import Colors from '../Constants/Colors'
import { color } from 'react-native-reanimated'
const UserProducts = () => {

    const UserProducts = createNativeStackNavigator()

    return (
        <UserProducts.Navigator screenOptions={{
            headerStyle: {
                backgroundColor: Colors.primary
            },
            headerTitleStyle: {
                fontFamily: "Roboto-Regular",
                color: "white"
            }
        }}>
            <UserProducts.Screen name='User Product' component={UserProduct} />
            <UserProducts.Screen name='Edit User Product' component={EditUserProduct} />
        </UserProducts.Navigator>
    )
}

export default UserProducts