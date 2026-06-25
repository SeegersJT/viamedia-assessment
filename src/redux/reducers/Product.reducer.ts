import { PRODUCT_ACTIONS } from '../actions/Product.action'
import type { ProductAction } from '../actions/Product.action'
import type { ProductState } from '../types/Product.type'

const initialState: ProductState = {
	productData: [],
	categoryData: [],

	productById: null,

	totalProducts: 0,

	productDataLoading: false,
	categoryDataLoading: false,
	productByIdLoading: false,
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

		case PRODUCT_ACTIONS.SET_CATEGORY_DATA_LOADING:
			return {
				...state,
				categoryDataLoading: action.payload,
			}

		case PRODUCT_ACTIONS.SET_CATEGORY_DATA:
			return {
				...state,
				categoryData: action.payload,
			}

		case PRODUCT_ACTIONS.SET_PRODUCT_BY_ID_LOADING:
			return {
				...state,
				productByIdLoading: action.payload,
			}

		case PRODUCT_ACTIONS.SET_PRODUCT_BY_ID:
			return {
				...state,
				productById: action.payload,
			}

		default:
			return state
	}
}
