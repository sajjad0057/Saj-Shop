import React,{useEffect} from 'react'
import { Link } from 'react-router-dom'
import { useDispatch,useSelector } from 'react-redux'
import { addToCart } from '../redux/actions/cartActions'




function CartScreens(props) {
    // console.log("CartScreens props--->",props);
    const productId = props.match.params.id
    const qty = props.location.search ? Number(props.location.search.split("=")[1]) : 1
    // console.log("qty --- >",qty);
    const dispatch = useDispatch()
    const cart = useSelector(state => state.cart)
    const {cartItems} = cart
    console.log("cartItems",cartItems);

    useEffect(()=>{
        if(productId){
            dispatch(addToCart(productId,qty))
        }
    },[dispatch,productId,qty])
    return (
        <div>
            Cart
        </div>
    )
}

export default CartScreens
