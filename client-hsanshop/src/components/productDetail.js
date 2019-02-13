import React, { Component } from 'react';
import '../styles/product_detail.css'
import * as ACTIONS from '../actions'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Loading from "react-loading-progress"

class product_detail extends Component {
    constructor(props) {
        super(props)
    }


    componentDidMount() {
        document.body.style.background = "#fff";
        this.props.actions.getDetailProduct(this.props.match.params.product_id)
    }


    render() {
        const { product } =  this.props
        const data = product[0]
                        
        if (product.length !==0 && data !== undefined) {
            return (
                <main className="container">
                    <div className="left-column">
                        <img data-image="red" className="active" src={data.image}/>
                        
                    </div>



                    <div className="right-column">


                        <div className="product-description">
                            <h1>{data.title}</h1>
                            <p>{data.description}</p>
                        </div>


                        <div className="product-configuration">


                            <div className="product-color">
                                <span>Color</span>

                                <div className="color-choose">

                                    {data.color.map((snap, i) => (
                                        <div key={i}>
                                            <input data-image="red" type="radio" id="red" name="color" value="red"  />
                                            <label htmlFor="red"><span style={{ backgroundColor: `${snap}` }}></span></label>
                                        </div>

                                    ))}




                                </div>

                            </div>


                            <div className="cable-config">
                                <span>Memory choosing</span>

                                <div className="cable-choose">
                                    {data.memory.map(gb=>(
                                        <button>{gb} GB</button>
                                    ))}
                                                                        
                                </div>


                            </div>
                        </div>


                        <div className="product-price">
                            <span>{data.price} K</span>
                            <a href="#" className="cart-btn">Add to cart</a>
                        </div>
                    </div>
                </main>
            )
        } else {
            return <div id="body">
            <Loading                               
                size={15}              
                loading={true}
                heightSize={9}
                widthSize={9}
            /></div>
        }
    }
}





const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(ACTIONS, dispatch)
    }
}
const mapStateToProps = (state) => {

    return {
        product: state.products,

    }
}


export default connect(mapStateToProps, mapDispatchToProps)(product_detail);







