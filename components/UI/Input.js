import { StyleSheet, Text, View, TextInput, KeyboardAvoidingView } from 'react-native'
import React, { useEffect, useReducer } from 'react'


const INPUT_CHANGE = "INPUT_CHANGE"
const INPUT_BLUR = "INPUT_BLUR"

const inputeReducer = (state, action) => {
    switch (action.type) {
        case INPUT_CHANGE:
            return {
                ...state,
                value: action.value,
                isValid: action.isValid
            }
        case INPUT_BLUR:
            return {
                ...state,
                touched: true
            }
        default: return state
    }
    return state
}

const Input = (props) => {
    const [inputState, dispatch] = useReducer(inputeReducer, {
        value: props.initialValue ? props.initialValue : "",
        isValid: props.isValid,
        touched: false
    })

    const { onInputChange, id } = props
    useEffect(() => {
        if (inputState.touched) {
            onInputChange(id, inputState.value, inputState.isValid)
        }
    }, [inputState, onInputChange, id])

    const textChangeHandler = (text) => {
        let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
        let isValid = true

        if (props.required && text.trim() === 0) {
            isValid = false;
        }
        if (props.email && emailRegex.test(text.lowerCase())) {
            isValid = false;
        }
        if (props.min != null && +text < props.min) {
            isValid = false;
        }
        if (props.max != null && +text > props.max) {
            isValid = false;
        }
        if (props.minLength != null && text.length < props.minLength) {
            isValid = false;
        }
        dispatch({ type: INPUT_CHANGE, value: text, isValid: isValid })
    }

    const lostFocusHandler = () => {
        dispatch({ type: INPUT_BLUR })
    }

    return (
        <View style={styles.formControl}>
            <Text style={styles.label}>{props.label}</Text>
            <TextInput
                {...props}
                style={styles.input}
                value={inputState.value}
                onChangeText={textChangeHandler.bind('title')}
                onSubmitEditing={() => { }}
                onBlur={lostFocusHandler}
            />
            {!inputState.isValid && <Text>{props.errorText}</Text>}
        </View>
    )
}

export default Input

const styles = StyleSheet.create({
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