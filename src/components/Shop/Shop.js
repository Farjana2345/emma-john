import React, { useState } from 'react';
import fakeData from '../../fakeData';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css';

const Shop = () => {
    const first15 =fakeData.slice(0,15);
    const [products, setProduct]=useState(first15);
    const [cart, setCart] = useState([]);

    const productAddHandler = (product)=>{
        // console.log('added product',product);
        const newCart = [...cart, product];
        setCart(newCart);
    }
    return (
        <div className="shop-container">
           <div className="product-container">
                <ul>
                    {
                        products.map(pd=><Product 
                            productAddHandler ={ productAddHandler}
                            product={pd}
                            ></Product>)
                    }
                </ul>
           </div>
           <div className="cart-container">
               <Cart cart ={cart}></Cart>
           </div>
        </div>
    );
};

export default Shop;