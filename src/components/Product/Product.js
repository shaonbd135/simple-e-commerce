import React from 'react';
import './Product.css';


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
            </div>
        </div>
    );
};

export default Product;