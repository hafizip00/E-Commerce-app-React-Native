import { StyleSheet, View, ScrollView, KeyboardAvoidingView, Button, Keyboard, Alert } from 'react-native'
import React, { useReducer } from 'react'
import { useRoute } from '@react-navigation/native'
import { useEffect } from 'react'

import { useDispatch } from 'react-redux'

import * as productActions from '../../store/acitons/products'

import { useSelector } from 'react-redux'
import Input from '../../components/UI/Input'
import { useCallback } from 'react'

const UPDATE_ACTION = "UPDATE_ACTION"

const formReducer = (state, action) => {
    if (action.type === UPDATE_ACTION) {
        const updateValues = {
            ...state.inputValues,
            [action.input]: action.value
        }
        const updateValidities = {
            ...state.inputValidities,
            [action.input]: action.isValid
        }
        let updatedFormIsValid = true
        for (const key in updateValidities) {
            updatedFormIsValid = updatedFormIsValid && updateValidities[key]
        }
        return {
            ...state,
            formIsValid: updatedFormIsValid,
            inputValidities: updateValidities,
            inputValues: updateValues,
        }
    }
    return state
}



const EditProductScreen = ({ navigation }) => {
    const dispatch = useDispatch()
    const router = useRoute()

    const productId = router.params ? router.params.Id : undefined
    const state = useSelector(state => state.products)

    const userProducts = useSelector(state => state.products.userProducts)
    const editedProduct = userProducts.find(product => product.id === productId)


    const [formState, formDispatch] = useReducer(formReducer, {
        inputValues: {
            title: editedProduct ? editedProduct.title : "",
            description: editedProduct ? editedProduct.description : " ",
            imageUrl: editedProduct ? editedProduct.imageUrl : " ",
            price: ""

        },
        inputValidities: {
            title: editedProduct ? true : false,
            imageUrl: editedProduct ? true : false,
            description: editedProduct ? true : false,
            price: editedProduct ? true : false,
        },
        formIsValid: editedProduct ? true : false
    })


    const inputChangeHandler = useCallback((inputIdentifier, inputValue, inputIsValid) => {
        console.log(inputIdentifier)

        formDispatch({
            type: UPDATE_ACTION,
            value: inputValue,
            isValid: inputIsValid,
            input: inputIdentifier
        })
    }, [formDispatch])

    const submitHanlder = () => {
        Keyboard.dismiss()
        if (!formState.formIsValid) {
            Alert.alert("Invalid title", "Please enter a valid title", [{ text: "Okay" }])
            return
        }
        if (editedProduct) {
            dispatch(productActions.updateProduct(productId,
                formState.inputValues.title,
                formState.inputValues.description,
                formState.inputValues.imageUrl
            ))
        } else {
            dispatch(productActions.createProduct(
                formState.inputValues.title,
                formState.inputValues.description,
                formState.inputValues.imageUrl,
                +formState.inputValues.price
            ))
        }
        navigation.goBack()
    }

    useEffect(() => {
        navigation.setOptions({
            headerTitle: router.params ? "Edit Product" : "Add Product",
            // headerRight: () => {
            //     return (
            //         <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
            //             <Item title='Save' iconName={Platform.OS === "android" ? "md-checkmark" : "ios-checkmark"}
            //                 onPress={submitHanlder} />
            //         </HeaderButtons>
            //     )
            // },
        })
    }, [])
    return (
        <KeyboardAvoidingView behavior='padding' keyboardVerticalOffset={100}>
            <ScrollView>
                <View style={styles.form}>
                    <Input
                        id={"title"}
                        keyboardType="default"
                        autoCapitalize
                        autoCorrect
                        returnKeyType="next"
                        label="Title"
                        errorText="Please enter a valid title before submitting"
                        onInputChange={inputChangeHandler}
                        initialValue={editedProduct ? editedProduct.title : ''}
                        isValid={!!editedProduct}
                        required

                    />
                    <Input
                        id={"imageUrl"}
                        keyboardType="default"
                        autoCapitalize
                        autoCorrect
                        returnKeyType="next"
                        label="Image URL"
                        errorText="Please enter a valid image URL before submitting"
                        onInputChange={inputChangeHandler}
                        initialValue={editedProduct ? editedProduct.imageUrl : ''}
                        isValid={!!editedProduct}
                        required

                    />
                    {editedProduct ? null : <Input
                        id={"price"}
                        keyboardType="decimal-pad"
                        autoCapitalize
                        autoCorrect
                        returnKeyType="next"
                        label="Price"
                        errorText="Please enter a valid Price before submitting"
                        onInputChange={inputChangeHandler}
                        required
                        min={.1}
                    />}
                    <Input
                        id={"description"}
                        keyboardType="default"
                        autoCapitalize
                        autoCorrect
                        multiline
                        numberOfLines={2}
                        label="Description"
                        errorText="Please enter a valid Description before submitting"
                        onInputChange={inputChangeHandler}
                        initialValue={editedProduct ? editedProduct.description : ''}
                        isValid={!!editedProduct}
                        required
                        minLength={5}

                    />
                    <Button title='Submit' onPress={submitHanlder} />
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}

export default EditProductScreen

const styles = StyleSheet.create({
    form: {
        margin: 20
    },
    formControl: {
        width: "100%"
    },
    label: {
        fontFamily: "Roboto-Bold",
        marginVertical: 8
    },
    input: {
        paddingHorizontal: 2,
        paddingVertical: 5,
        borderBottomColor: "#ccc",
        borderBottomWidth: 1
    },

})