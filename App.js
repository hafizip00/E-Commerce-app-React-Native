import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux'
import Reduxthunk from 'redux-thunk'

import productreducer from './store/reducers/products'
import cartReducer from './store/reducers/cart';
import orderReducer from './store/reducers/orders'

import { NavigationContainer } from '@react-navigation/native';
import Navigator from './navigations/Navigator';
import { useFonts } from 'expo-font';
import { createDrawerNavigator } from '@react-navigation/drawer';
import OrdersNavigator from './navigations/OrdersNavigator';
import { Ionicons } from '@expo/vector-icons';
import ReduxThunk from 'redux-thunk'

import UserProducts from './navigations/UserProducts';


const rootReducer = combineReducers({
  products: productreducer,
  cart: cartReducer,
  orders: orderReducer
})

const store = createStore(rootReducer, applyMiddleware(ReduxThunk))


export default function App() {
  const [fontsLoaded] = useFonts({
    'Roboto-Bold': require('./assets/fonts/Roboto-Bold.ttf'),
    'Roboto-Regular': require('./assets/fonts/Roboto-Regular.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  const Drawer = createDrawerNavigator()

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Drawer.Navigator screenOptions={{
          headerShown: false
        }}>
          <Drawer.Screen name='Products' component={Navigator}
            options={{
              drawerIcon: props => <Ionicons name={Platform.OS === "android" ? "md-cart" : "ios-cart"} size={20} color={props.color} />

            }}
          />
          <Drawer.Screen name='Orders' component={OrdersNavigator}
            options={{
              drawerIcon: props => <Ionicons name={Platform.OS === "android" ? "pricetag-sharp" : "ios-list"} size={20} color={props.color} />
            }}
          />
          <Drawer.Screen name='My Products' component={UserProducts}
            options={{
              drawerIcon: props => <Ionicons name={Platform.OS === "android" ? "checkmark-done-circle-sharp" : "ios-checkmark-circle-outline"} size={20} color={props.color} />
            }}
          />
        </Drawer.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

