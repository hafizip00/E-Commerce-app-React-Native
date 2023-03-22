import { StyleSheet, Button, FlatList, Platform, ActivityIndicator, View, Text } from 'react-native'
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import * as CartActions from '../../store/acitons/cart'

import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import CustomHeaderButton from '../../components/UI/HeaderButton'

import ProductItem from '../../components/shop/ProductItem'
import * as productActions from '../../store/acitons/products'
import Colors from '../../Constants/Colors'
import { useCallback } from 'react'


const ProductOverview = ({ navigation }) => {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState()

    const dispatch = useDispatch()
    const cart = useSelector(state => state.cart)

    const loadProducts = useCallback(async () => {
        setIsLoading(true)
        try {
            await dispatch(productActions.fetechProducts())
        } catch (error) {
            setError(error.message)
        }
        setIsLoading(false)
    })

    const productItem = (itemData) => {
        return <ProductItem image={itemData.item.imageUrl} title={itemData.item.title}
            price={itemData.item.price}
            onSelect={() => { navigation.navigate({ name: "Product Detail", params: { ProductName: itemData.item.title, Id: itemData.item.id } }) }}
        >
            <Button title='View Details' color={Colors.primary} onPress={() => { navigation.navigate({ name: "Product Detail", params: { ProductName: itemData.item.title, Id: itemData.item.id } }) }} />
            <Button title='Add to Cart' color={Colors.primary} onPress={() => {
                dispatch(CartActions.addToCart(itemData.item))
            }} />
        </ProductItem>
    }


    const [headerTitle, setHeaderTitle] = useState('All Products');

    useEffect(() => {
        // const willFocusSub = navigation.addListener("willFocus", loadProducts)
        const unsubscribe = navigation.addListener('focus', loadProducts);

        // Return the function to unsubscribe from the event so it gets removed on unmount
        return unsubscribe;
        // loadProducts()
    }, [dispatch])
    useEffect(() => {
        navigation.setOptions({
            title: headerTitle,
            headerRight: () => {
                return (
                    <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                        <Item title='Cart' iconName={Platform.OS === "android" ? "md-cart" : "ios-cart"}
                            onPress={() => { navigation.navigate({ name: "Cart" }) }} />
                    </HeaderButtons>
                )
            },
            headerLeft: () => {
                return (
                    <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                        <Item title='Cart' iconName={Platform.OS === "android" ? "md-menu" : "ios-menu"}
                            onPress={() => { navigation.toggleDrawer() }} />
                    </HeaderButtons>
                )
            },
        });
    }, [headerTitle, navigation]);

    const products = useSelector((state) => state.products.availableProducts)

    if (error) {
        return <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <Text>An Error Occurred</Text>
            <Button title='Reload' onPress={loadProducts} />
        </View>
    }


    if (isLoading) {
        return <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <ActivityIndicator size={"large"} color={Colors.accent} />
        </View>
    }


    if (!isLoading && products.length === 0) {
        return <View style={{ flex: 1, justifyContent: "center", alignItems: "center", }}>
            <Text>No Products Found</Text>
        </View>
    }
    return (
        <FlatList
            refreshing
            onRefresh={loadProducts}
            data={products} keyExtractor={item => item.id} renderItem={productItem} />
    )
}



export default ProductOverview

const styles = StyleSheet.create({})