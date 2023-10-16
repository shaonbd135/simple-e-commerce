import React from 'react';
import './Product.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';


const Product = (props) => {

    const { img, name, seller, price, stock, key } = props.product;
    return (
        <div className='product'>

            <div className='image'>
                <img src={img} alt="" />
            </div>

            <div>
                <h3 className='product-name'><Link to={"/product/" + key} style={{ textDecoration: 'none' }} >{name}</Link></h3>
                <p>Seller: {seller}</p>
                <p>${price}</p>
                <p>Only {stock} left in stock - Order soon</p>
                {
                    props.showAddToCart && <button onClick={() => props.handleAddProduct(props.product)} className='main-button'><FontAwesomeIcon icon={faShoppingCart} />
                        Add to cart
                    </button>
                }
            </div>
        </div>
    );
};

export default Product;