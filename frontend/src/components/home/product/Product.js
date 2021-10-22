import React from 'react';
import { Link } from 'react-router-dom';
import ReactStars from 'react-rating-stars-component';
import './product.css'


const Product = ({ product }) => {

    const options = {
        edit: false,
        value: product.ratings,
        isHalf: true,
        color: 'rgba(20, 20, 20, 0.1)',
        activeColor: 'tomato',
        size: window.innerWidth < 600 ? 15 : 20
    }
    return (

        <Link className="productCard" to={product._id}>
            <img src={product.images[0].imgUrl} alt="ProductUrl" />
            <p> {product.name} </p>
            <div>
                <ReactStars {...options} />
                <span className='productCardSpan'>(256 Reviews)</span>
            </div>
            <span> ¥ {product.price}</span>
        </Link>

    )
}

export default Product
