import { createApiService } from './base.api'
import type { ProductItem } from '../../redux/types/Product.type'

export const productApi = createApiService<ProductItem>('products')
