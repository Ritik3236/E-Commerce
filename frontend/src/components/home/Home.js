import React, { useEffect } from 'react';
import { CgMouse } from 'react-icons/cg';
import Product from './product/Product';
// import cardImage from '../../images/cardImage.jpeg'
import './Home.css';
import MetaData from '../layout/MetaData';
import { getProduct } from '../../actions/productAction'
import { useSelector, useDispatch } from 'react-redux';


const Home = () => {

    const dispatch = useDispatch();
    // eslint-disable-next-line 
    const { loading, error, products, productsCount } = useSelector((state) => state.products)

    useEffect(() => {
        dispatch(getProduct())
    }, [dispatch])

    return (
        <>
            <MetaData title="Home Page" />
            <div className="banner">
                <h2>Welcome to ItsYourShop</h2>
                <p>Find Amazing Product Below</p>
                <a href="#container">
                    <button> Scroll <CgMouse /></button>
                </a>
            </div>
            <p className="homeHeading">Featured Product</p>
            <div className="container" id="container">
                {products && products.map(product => { return (<Product key={product._id} product={product} />) })}
            </div>

        </>
    )
}

export default Home
