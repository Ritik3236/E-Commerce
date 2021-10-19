import React from 'react';
import { CgMouse } from 'react-icons/cg';
import Product from './product/Product';
import cardImage from '../../images/cardImage.jpeg'
import './Home.css'

const product = {
    name: 'My Product',
    imageUrl: cardImage,
    price: "¥2000",
    _id: 'product'
}

const Home = () => {
    return (
        <>
            <div className="banner">
                <h2>Welcome to ItsYourShop</h2>
                <p>Find Amazing Product Below</p>
                <a href="#container">
                    <button> Scroll <CgMouse /></button>
                </a>
            </div>
            <p className="homeHeading">Featured Product</p>
            <div className="container" id="container">
                <Product product={product} />
            </div>

        </>
    )
}

export default Home
