import React from 'react';
import { Route, Switch } from 'react-router-dom'
import ProductList from './components/productList';
import AddData from './components/addData'
import productDetail from './components/productDetail'

const routes = () => {
    
    return (
        <div>                        
            <Switch>                
                <Route path="/product/:product_id" component={productDetail} />
                <Route path="/add_data" component={AddData} />
                <Route path="/" component={ProductList} />
            </Switch>
        </div>
    );
};

export default routes;