import React from 'react';
import './Cart.css';
import { Link } from 'react-router-dom';

const Cart = (props) => {
    const cart = props.cart;
    let total = 0;
    for (let i = 0; i < cart.length; i++) {
        let product = (cart[i].price * cart[i].quantity).toFixed(2);
        product = parseFloat(product);
        total = (total + product).toFixed(2);
        total = parseFloat(total);
    }
    

    let shipping = (12.99).toFixed(2);
    shipping = parseFloat(shipping);

    if (total > 500) {
        shipping = 0;
    }

    else if (total > 100) {
        shipping = 4.99;
    }

    else if (total === 0) {
        shipping = 0;
    }

    let tax = (total / 10).toFixed(2);
    tax = parseFloat(tax);

    let grandTotal = (total + shipping + tax).toFixed(2);
    grandTotal = parseFloat(grandTotal);


    return (
        <div>
            <h4>Order Summery</h4>
            <p>Items Ordered : {cart.length}</p>
            <p>Product Price :${total}</p>
            <p>Shipping Cost :${shipping}</p>
            <p>Tax           :${tax}</p>
            <p>Total Price   :${grandTotal} </p>
            <br />
            {
                props.showReviewOrder && <Link to='/review'><button className='main-button'>Review Order</button></Link>
            }

        </div>

    );
};

export default Cart;