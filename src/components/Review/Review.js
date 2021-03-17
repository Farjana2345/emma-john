import React, { useEffect, useState } from 'react';
import fakeData from '../../fakeData';
import { getDatabaseCart, processOrder, removeFromDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import ReviewItem from '../ReviewItem/ReviewItem';
import happyImage from '../../images/giphy.gif';
import { useHistory } from 'react-router';

const Review = () => {
    const [cart,setCart]= useState([]);
    const[orderPlace, setOrder]=useState(false);
    const history= useHistory();
    const handleProceedCheckout=()=>{
        history.push('/shipment')
    }

    const removeProduct =(productKeys)=>{
        console.log('clicked');
        const newCart = cart.filter(pd=>pd.key !==productKeys);
        setCart(newCart);
        removeFromDatabaseCart(productKeys);
    }
    useEffect(()=>{
        const saveCart = getDatabaseCart();
        const productKeys= Object.keys(saveCart);
        const cartProducts = productKeys.map(key => {
            const product = fakeData.find(pd=>pd.key === key);
            product.quantity=saveCart[key];
            return product;
        });
        setCart(cartProducts);
    },[]);
    
    let thankYou;
    if(orderPlace){
       thankYou = <img src={happyImage} alt=""/>
    }
   

    return (
        <div className="twin-container">
           <div className="product-container">
                    {
                        cart.map(pd=><ReviewItem removeProduct={removeProduct}
                            key = {pd.key} product={pd}></ReviewItem>)
                    }
                    {thankYou}
           </div>
           <div className="cart-container">
                    <Cart cart={cart}>
                        <button onClick={handleProceedCheckout} className="main-button">Proceed Checkout</button>
                    </Cart>
           </div>
        </div>
    );
};

export default Review;