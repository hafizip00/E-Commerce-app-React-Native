import { StyleSheet, Button, FlatList } from 'react-native'
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ProductItem from '../../components/shop/ProductItem.jsx'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import CustomHeaderButton from '../../components/UI/HeaderButton.js';
import * as ProductActions from '../../store/acitons/products'

const UserProduct = ({ navigation }) => {

    const dispatch = useDispatch()

    const userProducts = useSelector(state => state.products.userProducts)

    useEffect(() => {
        navigation.setOptions({
            headerTitle: "My Products",
            headerLeft: () => {
                return (
                    <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                        <Item title='Cart' iconName={Platform.OS === "android" ? "md-menu" : "ios-menu"}
                            onPress={() => { navigation.toggleDrawer() }} />
                    </HeaderButtons>
                )
            },
            headerRight: () => {
                return (
                    <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                        <Item title='Add' iconName={Platform.OS === "android" ? "md-create" : "ios-create"}
                            onPress={() => { navigation.navigate({ name: "Edit User Product", params: { Id: "" } }) }} />
                    </HeaderButtons>
                )
            },
        })
    })

    return (
        <FlatList
            data={userProducts}
            keyExtractor={(item) => item.id}
            renderItem={(itemData) => <ProductItem image={itemData.item.imageUrl} title={itemData.item.title}
                price={itemData.item.price}
                onSelect={() => { navigation.navigate({ name: "Edit User Product", params: { Id: itemData.item.id } }) }}
            >
                <Button title='Edit' color={Colors.primary} onPress={() => { navigation.navigate({ name: "Edit User Product", params: { Id: itemData.item.id } }) }} />
                <Button title='Delete' color={Colors.primary} onPress={() => {
                    dispatch(ProductActions.deleteProduct(itemData.item.id))
                }} />
            </ProductItem>}
        />
    )
}

export default UserProduct

const styles = StyleSheet.create({})