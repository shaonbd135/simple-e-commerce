import React, { useEffect, useState } from 'react';
import './Shop.css'
import fakeData from '../../fakeData/products.JSON'
import Product from '../Product/Product';
import Cart from '../Cart/Cart';
import { addToDb, getStoredCart } from '../../utilities/fakedb';
import NewData from '../../fakeData/NewFake';
import ReviewItem from '../ReviewItem/ReviewItem';
const Shop = () => {


    const [products, setProducts] = useState([]);

    // useEffect(() => {

    //     fetch(fakeData)
    //         .then(res => res.json())
    //         .then(data => {
    //             const newData = data.slice(0, 10);
    //             setProducts(newData);
    //         });
    // }, []);

    useEffect(() => {

        setProducts(NewData);

    }, []);



    const [cart, setCart] = useState([]);

    useEffect(() => {
        const savedCart = getStoredCart();
        const productKeys = Object.keys(savedCart);
        const previousCart = productKeys.map(existingKey => {

            const product = NewData.find(pd => pd.key === existingKey);
            product.quantity = savedCart[existingKey];
            return product

        })

        setCart(previousCart);

    }, [])

    const handleAddProduct = (product) => {
        const toBeAddedKey = product.key;
        const sameProduct = cart.find(pd => pd.key === toBeAddedKey);
        let count = 1;
        let newCart;

        if (sameProduct) {
            count = sameProduct.quantity + 1;
            sameProduct.quantity = count;
            const others = cart.filter(pd => pd.key !== toBeAddedKey);
            newCart = [...others, sameProduct]
        }
        else {
            product.quantity = 1;
            newCart = [...cart, product];
        }
        setCart(newCart);
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
                <Cart showReviewOrder={true} cart={cart}></Cart>
            </div>
        </div>
    );
};

export default Shop;