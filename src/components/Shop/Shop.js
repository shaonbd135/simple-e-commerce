import React, { useEffect, useState } from 'react';
import './Shop.css'
import fakeData from '../../fakeData/products.JSON'
import Product from '../Product/Product';
const Shop = () => {


    const [products, setProducts] = useState([]);

    useEffect(() => {

        fetch(fakeData)
            .then(res => res.json())
            .then(data => {
                const newData = data.slice(0, 10);
                setProducts(newData);
            });
    }, []);

    const handleAddProduct = (product)=>{
        console.log(product)
    }

    return (
        <div className='shop-container'>
            <div className="product-container">

                {
                    products.map(pd => <Product handleAddProduct={handleAddProduct} product={pd}></Product>)
                }

            </div>

            <div className="cart-container">

                <h3>This is cart</h3>
                
            </div>
        </div>
    );
};

export default Shop;