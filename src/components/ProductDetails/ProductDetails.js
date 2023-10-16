import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Product from '../Product/Product';
import NewFake from '../../fakeData/NewFake';
import './ProductDetails.css'

const ProductDetails = () => {

    const { productKey } = useParams();
    const newProduct = NewFake.find(pd => pd.key === productKey);

    return (
        <div className='ProductDetails'>
            <h1> {productKey} Product Details Coming Soon</h1>
            <Product showAddToCart={false} product={newProduct}></Product>
        </div>
    );
};

export default ProductDetails;