import React, { useEffect, useState } from 'react';
import { getStoredCart, deleteFromDb, clearTheCart } from '../../utilities/fakedb';
import NewFake from '../../fakeData/NewFake';
import ReviewItem from '../ReviewItem/ReviewItem';
import './Review.css'
import Cart from '../Cart/Cart';
import happyImage from '../../images/giphy.gif'

const Review = () => {
    const [cart, setCart] = useState([]);
    const [orderPlace, setOrderPlace] = useState(false);

    const handlePlaseOrder = () => {
        setCart([]);
        setOrderPlace(true)
        clearTheCart();
    }

    const removeProduct = (productKey) => {
        const newCart = cart.filter(pd => pd.key !== productKey);
        setCart(newCart);
        deleteFromDb(productKey);
    }

    useEffect(() => {

        const saveCart = getStoredCart();
        const productKeys = Object.keys(saveCart);
        // const values = Object.values(saveCart);

        const cartProducts = productKeys.map(key => {
            const product = NewFake.find(pd => pd.key === key);
            product.quantity = saveCart[key];
            return product;
        });

        setCart(cartProducts);

    }, []);

    let thankYou;
    let thankYouMsg;
    if (orderPlace) {
        thankYou = <img src={happyImage} alt="" />;
        thankYouMsg = <h3>Thank You for Order</h3>
    }

    return (
        <div className='shop-container2'>
            <div className="product-container2">
                {/* {
                    cart.length === 0 ? <h3 style={{ textAlign: 'center', color: 'red' }}>Your Cart is Empty ! </h3> : ''
                } */}
                {
                    cart.map(pd => <ReviewItem product={pd} removeProduct={removeProduct} key={pd.key} ></ReviewItem>)
                }
                <div style={{ textAlign: 'center' }}>
                    {
                        thankYouMsg
                    }
                    {
                        thankYou
                    }

                </div>

            </div>

            <div className="cart-container2">
                <Cart showReviewOrder={false} cart={cart}></Cart>
                {
                    cart.length > 0 ? <button onClick={handlePlaseOrder} className='main-button'>Place Order</button> : ""
                }
            </div>
        </div>
    );
};

export default Review;