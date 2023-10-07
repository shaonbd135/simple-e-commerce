import React from 'react';
import './Product.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'


const Product = (props) => {

    const { img, name, seller, price, stock } = props.product;
    return (
        <div className='product'>

            <div className='image'>
                <img src={img} alt="" />
            </div>

            <div>
                <h3 className='product-name'>{name}</h3>               
                <p>Seller: {seller}</p>
                <p>${price}</p>
                <p>Only {stock} left in stock - Order soon</p>
                <button onClick={()=>props.handleAddProduct(props.product)} className='main-button'><FontAwesomeIcon icon={faShoppingCart} /> Add to cart</button>               
            </div>
        </div>
    );
};

export default Product;