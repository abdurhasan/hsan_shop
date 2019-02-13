import { LOAD_ALL_PRODUCTS_FAILURE, GET_DETAIL_PRODUCT_FAILURE, GET_DETAIL_PRODUCT_SUCCESS, LOAD_ALL_PRODUCTS_SUCCESS, GET_PAGES } from '../action_types';

export default function (state = [], action) {
    switch (action.type) {

        case GET_DETAIL_PRODUCT_FAILURE:
            console.log(action.err)
        case GET_DETAIL_PRODUCT_SUCCESS:
            return [action.product]
        case LOAD_ALL_PRODUCTS_FAILURE:
            return state

        case GET_PAGES:
            return [...state, { pages: action.pages }]

        case LOAD_ALL_PRODUCTS_SUCCESS:
            return [...state, ...action.products]

        default:
            return state;
            break;
    }
}

