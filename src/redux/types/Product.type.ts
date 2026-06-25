export interface ProductItem {
	id: number
	title: string
	description: string
	category: string
	price: number
	discountPercentage: number
	rating: number
	stock: number
	brand?: string
	thumbnail: string
	images: string[]
}

export interface ProductQueryParams {
	limit?: number
	skip?: number
	select?: string
	sortBy?: string
	order?: 'asc' | 'desc'
	search?: string
}

export interface ProductState {
	productData: ProductItem[]
	categoryData: string[]
	productById: ProductItem | null
	totalProducts: number
	productDataLoading: boolean
	categoryDataLoading: boolean
	productByIdLoading: boolean
}
