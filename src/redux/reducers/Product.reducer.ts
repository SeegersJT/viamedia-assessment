import { PRODUCT_ACTIONS } from '../actions/Product.action'
import type { ProductAction } from '../actions/Product.action'
import type { ProductState } from '../types/Product.type'

const initialState: ProductState = {
	productData: [],
	totalProducts: 0,
	productDataLoading: false,
}

export const ProductReducer = (state = initialState, action: ProductAction): ProductState => {
	switch (action.type) {
		case PRODUCT_ACTIONS.SET_PRODUCT_DATA_LOADING:
			return {
				...state,
				productDataLoading: action.payload,
			}

		case PRODUCT_ACTIONS.SET_PRODUCT_DATA:
			return {
				...state,
				productData: action.payload,
			}

		case PRODUCT_ACTIONS.SET_TOTAL_PRODUCT_COUNT:
			return {
				...state,
				totalProducts: action.payload,
			}

		default:
			return state
	}
}
