import React, { useEffect, useState } from 'react';
import './Shop.css'
import fakeData from '../../fakeData/products.JSON'
import Product from '../Product/Product';
import Cart from '../Cart/Cart';
import { addToDb } from '../../utilities/fakedb';
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

    const [cart,setCart] = useState([]);

    const handleAddProduct = (product)=>{
        const newCart = [...cart,product];
        setCart(newCart);
        const sameProduct = cart.filter(pd => pd.key === product.key);
        const count = sameProduct.length;
        addToDb(product.key, count)
    }

    return (
        <div className='shop-container'>
            <div className="product-container">

                {
                    products.map(pd => <Product showAddToCart={true} handleAddProduct={handleAddProduct} product={pd} key={pd.key}></Product>)
                }

            </div>

            <div className="cart-container">
                <Cart cart ={cart}></Cart>                
            </div>
        </div>
    );
};

export default Shop;