import React, { useEffect, useState } from 'react';
import fakeData from '../../fakeData';
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css';
import { Link } from 'react-router-dom';

const Shop = () => {
    const first15 =fakeData.slice(0,15);
    const [products, setProduct]=useState(first15);
    const [cart, setCart] = useState([]);

    useEffect(()=>{
        const saveCart = getDatabaseCart();
        const productKeys = Object.keys(saveCart);
        const previousCart = productKeys.map(existingKey=>{
            const product= fakeData.find(pd=>pd.key===existingKey);
            product.quantity =saveCart[existingKey];
            return product;
        })
        setCart(previousCart);
        
    },[setProduct]);

    const productAddHandler = (product)=>{
        // console.log('added product',product);
        const toBeAdded=product.key;
        const sameProduct = cart.find(pd =>pd.key === toBeAdded);
        let count = 1;
        let newCart;
        if(sameProduct){
            count = sameProduct.quantity+1;
            sameProduct.quantity = count;
            const others = cart.filter(pd=>pd.key !==toBeAdded);
           newCart =[...others, sameProduct];
        }
        else{
            product.quantity = 1;
            newCart =[...cart, product];
        }
        setCart(newCart);
        addToDatabaseCart(product.key, count);
    }
    return (
        <div className="twin-container">
           <div className="product-container">
                <ul>
                    {
                        products.map(pd=><Product 
                            key = {pd.key}
                           showAddToCart={true} productAddHandler ={ productAddHandler}
                            product={pd}
                            ></Product>)
                    }
                </ul>
           </div>
           <div className="cart-container">
               <Cart cart ={cart}>
               <Link to ="/review"> 
                <button className="main-button">Review order</button>
            </Link>
            
               </Cart>
           </div>
        </div>
    );
};

export default Shop;