import axios from 'axios'
import '../styles/product_list.css'
import React, { Component } from 'react';
import * as ACTIONS from '../actions'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Loading from "react-loading-progress"
// component
import ProductItem from '../components/productItem'

class productList extends Component {
    constructor(props) {
        super(props)

        this.state = {
            URL: 'https://api-hsanshop.herokuapp.com/api/products/pages',
            hasMore: true,
            initialPage: 0,
            totalData: 0

        }

        window.onscroll = () => {
            
            const { hasMore } = this.state;
            if(!hasMore)return;
            if (
                window.innerHeight + document.documentElement.scrollTop
                === document.documentElement.offsetHeight
            ) {
                this.loadData()
            }
        };

    }

    loadData = () => {
        this.setState({
            initialPage: this.state.initialPage + 1
        }, () => {
            this.props.actions.loadProductsAll(this.state.initialPage)
            this.setState({hasMore: (this.state.initialPage <= Math.ceil((this.state.totalData - 1) / 4))})
        })

    }

    componentWillMount() {
        axios.get(this.state.URL)
            .then(snap => this.setState({
                totalData: snap.data                
            }))
        document.body.style.background = "#f2f4f8";
    }

    componentDidMount() {
        this.props.actions.loadProductsAll(0);
    }

    render() {
        const data = this.props.data || []
        // console.log('RENDER', this.props.data, this.state.initialPage)
        let displayProduct = data.map((item, index) => {
            return (<ProductItem key={index} data={item} />)
        })

        if (data.length !== 0) {
            return (
                <div>
                    <button type="button" id="fixed_button"> <Link to="add_data" style={{ textDecoration: 'none', color: 'white' }}> add Ads </Link> </button>
                    <div id="body">
                        {displayProduct}
                    </div>
                </div>
            );
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
        data: state.products
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(productList);