import { StyleSheet, Text, View, Image, Button, ScrollView } from 'react-native'
import React, { useEffect } from 'react'
import { useRoute } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import * as CartActions from '../../store/acitons/cart'
import { useState } from 'react';
import Colors from '../../Constants/Colors';

const ProductDetail = ({ navigation }) => {
    const dispatch = useDispatch()
    const route = useRoute();
    const [Product, setProduct] = useState()
    const selectedProduct = useSelector((state) => state.products.availableProducts.find((product) => product.id === route.params.Id))
    navigation.setOptions({
        title: route.params.ProductName,
    });
    useEffect(() => {
        setProduct(selectedProduct)
    }, [navigation]);

    if (!Product) {
        return <Text>Loading...</Text>
    }
    return (
        <ScrollView>
            {Product && <View>
                <Image source={{ uri: Product.imageUrl }} style={styles.image} />
                <View style={styles.actions}>
                    <Button title='Add to Cart' onPress={() => { dispatch(CartActions.addToCart(Product)) }} color={Colors.primary} />
                </View>
                <Text style={styles.price}>${Product.price.toFixed()}</Text>
                <Text style={styles.description}>{Product.description}</Text>
            </View>}
        </ScrollView>
    )
}

export default ProductDetail

const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: 300
    },
    price: {
        fontSize: 20,
        color: '#888',
        textAlign: 'center',
        marginVertical: 20,
        fontFamily: "Roboto-Bold",
    },
    description: {
        fontSize: 14,
        textAlign: 'center',
        marginHorizontal: 20,
        fontFamily: "Roboto-Regular"
    },
    actions: {
        marginVertical: 10,
        alignItems: 'center',
    }
})