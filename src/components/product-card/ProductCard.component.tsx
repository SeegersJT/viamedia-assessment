import type { ProductItem } from '@/redux/types/Product.type'
import { Star } from 'lucide-react'

interface ProductCardProps {
	product: ProductItem
	canManage: boolean
	onGoToNavigateClick: (path: string) => void
}
function ProductCard({ product, canManage, onGoToNavigateClick }: ProductCardProps) {
	return (
		<div className="card-pop group relative flex flex-col overflow-hidden">
			{canManage && (
				<div className="absolute right-2 top-2 z-10 flex gap-1">
					{/* ADD_EDIT_BUTTON_HERE */}
				</div>
			)}

			<button
				onClick={() => onGoToNavigateClick(`/dashboard/product/${product.id}`)}
				className="flex flex-1 flex-col hover:cursor-pointer"
			>
				<div className="relative aspect-square w-full overflow-hidden border-b-1 border-foreground bg-muted">
					<img
						src={product.thumbnail}
						alt={product.title}
						loading="lazy"
						className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
					/>
					<span className="chip chip-primary absolute left-2 top-2">
						{product.category}
					</span>
				</div>
				<div className="flex flex-1 flex-col gap-2 p-4">
					<h3 className="font-display text-lg font-bold leading-tight line-clamp-2">
						{product.title}
					</h3>
					<div className="mt-auto flex items-end justify-between gap-2 pt-2">
						<div>
							<p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
								Price
							</p>
							<p className="font-display text-2xl font-bold text-primary">
								R{product.price.toFixed(2)}
							</p>
						</div>
						<div className="flex items-center gap-1 rounded-md border-1 border-foreground px-2 py-1 text-sm font-bold">
							<Star className="h-3.5 w-3.5 fill-primary text-primary" />
							{product.rating.toFixed(1)}
						</div>
					</div>
				</div>
			</button>
		</div>
	)
}

export default ProductCard
