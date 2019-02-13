import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './routes'
import { BrowserRouter } from 'react-router-dom'

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk'
import reducers from './reducers'

const createStoreWithMiddleware = createStore(reducers, applyMiddleware(thunkMiddleware))

ReactDOM.render(

    <Provider store={createStoreWithMiddleware}>
        <BrowserRouter>
            <Routes />
        </BrowserRouter>
    </Provider>


    ,
    document.getElementById('root'));
