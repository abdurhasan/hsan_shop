import React from 'react';
import {Link} from 'react-router-dom'
const productItem =({ data, key })=> {

    return (
        <div className="card_container" >
            <div href="#" className="card">
                <div className="img-product">
                    <img src={data.image} alt="true" />
                </div>
                <div className="info-product">
                    <div className="name-product">{data.title}</div>
                    <div className="price-product">{data.price}K</div>
                </div>
                
                <button type="button">
                <Link to={`/product/${data.id}`} style={{ textDecoration: 'none', color: 'black' }}>Detail</Link>                                
                </button>
            </div>
        </div>
    )

}


export default productItem;

