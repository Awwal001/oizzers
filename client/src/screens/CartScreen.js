import React, { useEffect, Fragment } from 'react'
import "./Assets/css/Cart.css";
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Form } from 'react-bootstrap'
import { addToCart, removeFromCart } from '../actions/cartActions'
import CartItemCard from "./CartItemCard";
import { Typography } from "@material-ui/core";
import RemoveShoppingCartIcon from "@material-ui/icons/RemoveShoppingCart";


function CartScreen({ match, location, history }) {
    const productId = match.params.id
    const qty = location.search ? Number(location.search.split('=')[1]) : 1
    const dispatch = useDispatch()

    const cart = useSelector(state => state.cart)
    const { cartItems } = cart

    useEffect(() => {
        if (productId) {
            dispatch(addToCart(productId, qty))
        }
    }, [dispatch, productId, qty])

    const removeFromCartHandler = (id) => {
        dispatch(removeFromCart(id))
    }

    const checkoutHandler = () => {
        history.push('/login?redirect=shipping')
    }

    return (
        <Fragment>
          {cartItems.length === 0 ? (
            <div className="emptyCart">
              <RemoveShoppingCartIcon />
              <Typography>No Product in Your Cart</Typography>
              <Link to="/">Home</Link>
            </div>
          ) : (
            <Fragment>
              <div className="cartPage">
                <div className="cartHeader">
                  <p>Product</p>
                  <p>Quantity</p>
                  <p>Subtotal</p>
                </div>
    
                {cartItems &&
                  cartItems.map((item) => (
                    <div className="cartContainer" key={item.product}>
                      <CartItemCard item={item} deleteCartItems={removeFromCartHandler} />
                      <div className="cartInput">
                      <Form.Control
                            as="select"
                            value={item.qty}
                            onChange={(e) => dispatch(addToCart(item.product, Number(e.target.value)))}
                        >
                            {

                                [...Array(item.countInStock).keys()].map((x) => (
                                    <option key={x + 1} value={x + 1}>
                                        {x + 1}
                                    </option>
                                ))
                            }

                        </Form.Control>
                      </div>
                      <p className="cartSubtotal">{`${
                        item.price * item.qty
                      } NGN`}</p>
                    </div>
                  ))}
    
                <div className="cartGrossProfit">
                  <div></div>
                  <div className="cartGrossProfitBox">
                    <p>Gross Total</p>
                    <p>{`${cartItems.reduce(
                      (acc, item) => acc + item.qty * item.price,
                      0
                    )} NGN`}</p>
                  </div>
                  <div></div>
                  <div className="checkOutBtn">
                    <button onClick={checkoutHandler}>Check Out</button>
                  </div>
                </div>
              </div>
            </Fragment>
          )}
        </Fragment>
      );
}

export default CartScreen