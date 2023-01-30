export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const CREATE_PRODUCT = 'CREATE_PRODUCT';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';
export const SET_PRODUCTS = 'SET_PRODUCTS';
import Product from "../../models/products";


export const fetechProducts = () => {
    return async (dispatch) => {
        const response = await fetch("https://fir-learning-9c94c-default-rtdb.firebaseio.com/products.json")

        const resData = await response.json()
        const loadedProducts = []

        for (const key in resData) {
            loadedProducts.push(new Product(
                key,
                'u1',
                resData[key].title,
                resData[key].imageUrl,
                resData[key].description,
                resData[key].price
            ))
        }

        dispatch({ type: SET_PRODUCTS, products: loadedProducts })
    }
}


export const deleteProduct = (id) => {
    return {
        type: DELETE_PRODUCT,
        productId: id,
    }
}

export const createProduct = (title, description, imageUrl, price) => {
    return async (dispatch) => {
        const response = await fetch("https://fir-learning-9c94c-default-rtdb.firebaseio.com/products.json", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                title: title,
                description: description,
                imageUrl: imageUrl,
                price: price
            })
        })

        const resData = await response.json()


        dispatch({
            type: CREATE_PRODUCT,
            productData: {
                id: resData.name,
                title: title,
                description: description,
                imageUrl: imageUrl,
                price: price
            }
        })
    }


}

export const updateProduct = (id, title, description, imageUrl) => {
    return {
        type: UPDATE_PRODUCT,
        pid: id,
        productData: {
            title: title,
            description: description,
            imageUrl: imageUrl,
        }
    }
}