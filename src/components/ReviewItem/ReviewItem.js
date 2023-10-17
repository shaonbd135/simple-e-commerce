import React from 'react';
import './ReviewItem.css';

const ReviewItem = (props) => {

    console.log(props.product)

    const {name,price,quantity,img}=props.product


   

    return (
        <div className='review-item'>
            <img style={{width:'150px'}} src={img} alt="" />
            <h4 className='product-name'>Review Items Name: {name}</h4>
            <p>Unit Price: {price}</p>
            <p>Quantity: {quantity}</p>
            <p>Total Price: {price * quantity}</p>
            <br />
            <button className='main-button'>Remove Item</button>
        </div>

    );
};

export default ReviewItem;