import React, { useEffect, useState } from 'react';
import { getStoredCart } from '../../utilities/fakedb';
import NewFake from '../../fakeData/NewFake';
import ReviewItem from '../ReviewItem/ReviewItem';

const Review = () => {
    const [cart, setCart] = useState([]);

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

    return (
        <div>
            <h3 style={{textAlign:'center'}}>Total Cart Item {cart.length}</h3>
            {
                cart.map(pd => <ReviewItem product={pd} ></ReviewItem>)
            }
            
        </div>
    );
};

export default Review;