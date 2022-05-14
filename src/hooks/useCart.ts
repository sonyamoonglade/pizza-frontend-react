import {DatabaseCartProduct} from "../common/types";

const CART_KEY = 'cart'
export function useCart(){

    function toJSON(i: any){
        return JSON.stringify(i)
    }
    function parseJSON(i: any){
        return JSON.parse(i)
    }

    const addProduct = (product: DatabaseCartProduct) => {
        const actualCart = getCart()
        const sameProductIdx = actualCart.findIndex(p => p.id === product.id)
        let newCart
        if(sameProductIdx === -1){
            newCart = actualCart.concat(product)
        }
        else {
            newCart = actualCart.map(p => {
                if(p.id === product.id){
                    p.quantity += 1
                    return p
                }
                return p
            })

        }
        updateCart(newCart)
    }

    const removeProduct = (id: number) => {
        const actualCart = getCart()
        const newCart = actualCart.filter((p) => p.id !== id)
        updateCart(newCart)
    }

    const getCart = () => {
        const cart:DatabaseCartProduct[] = parseJSON(localStorage.getItem(CART_KEY))
        return cart !== null ? cart : []
    }

    const updateCart = (cart:DatabaseCartProduct[]) => {
        localStorage.setItem(CART_KEY,toJSON(cart))
        return
    }

    const clearCart = () => {
        updateCart([])
    }

    const calculateCartTotalPrice = () => {

        const actualCart = getCart()
        let totalPrice = actualCart.reduce((a,c) => {
            a += c.price * c.quantity
            return a
        },0)

        return totalPrice


    }

    return {addProduct,removeProduct,getCart,clearCart,calculateCartTotalPrice}

}




