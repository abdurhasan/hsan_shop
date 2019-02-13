
import axios from 'axios';
import * as TYPES from '../action_types';


const URL = 'https://api-hsanshop.herokuapp.com/api/products';


function getDetailProductFailure(err) {
    return { type: TYPES.GET_DETAIL_PRODUCT_FAILURE ,err}
}

function getDetailProductSuccess(product) {
    return { type: TYPES.GET_DETAIL_PRODUCT_SUCCESS, product }
}

export function getDetailProduct(id) {
    return dispatch => {
        return axios
            .get(`${URL}/${id}`)
        .then(snap=>dispatch(getDetailProductSuccess(snap.data.data)))
        .catch(err=>dispatch(getDetailProductFailure(err)))
    }

}


function loadAllProductFailure(err) {
    return { type: TYPES.LOAD_ALL_PRODUCTS_FAILURE ,err}
}

function loadAllProductSuccess(products) {
    return { type: TYPES.LOAD_ALL_PRODUCTS_SUCCESS, products }
}

export function loadProductsAll(hal) {
    return dispatch => {
        return axios
            .get(`${URL}?page=${hal}`)
        .then(snap=>dispatch(loadAllProductSuccess(snap.data)))
        .catch(err=>dispatch(loadAllProductFailure(err)))
    }

}

function letPage(pages){
    return {type:TYPES.GET_PAGES,pages:pages}
}

export function getPages() {
    return dispatch=>{ axios.get(`${URL}/pages`)
        .then(snap=>dispatch(letPage(snap.data)))
    }
  }
  
  