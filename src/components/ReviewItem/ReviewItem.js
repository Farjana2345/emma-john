import React from 'react';

const ReviewItem = (props) => {
    const{name, quantity,key,price}=props.product;
    return (
        <div style={{borderBottom:'1px solid lightgray',paddingBottom:'5px',marginLeft:'200px'}} className="review-item">
            <h4>{name}</h4>
            <p>Quantity: {quantity}</p>
            <p>Price : ${price}</p>
            <br/>
            <button onClick={()=>props.removeProduct(key)} className="main-button">Remove</button>
        </div>
    );
};

export default ReviewItem;