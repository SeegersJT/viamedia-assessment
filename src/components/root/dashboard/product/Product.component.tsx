import Specification from '@/components/specification/Specification.component'
import type { ProductItem } from '@/redux/types/Product.type'
import { ArrowLeft, Package, Star, Tag } from 'lucide-react'

function Product({
	product,
	finalPrice,
	onGoToNavigateClick,
}: {
	product: ProductItem
	finalPrice: number
	onGoToNavigateClick: (path: string) => void
}) {
	return (
		<div className="mx-auto max-w-6xl px-4 py-8 sm:py-12">
			<button
				onClick={() => onGoToNavigateClick('/dashboard/catalog')}
				className="mb-6 inline-flex items-center gap-1 text-sm font-bold hover:text-primary hover:cursor-pointer"
			>
				<ArrowLeft className="h-4 w-4" /> Back to catalog
			</button>

			<div className="grid gap-8 lg:grid-cols-2">
				<div>
					<div className="card-pop aspect-square overflow-hidden">
						<img
							src={product.images[0]}
							alt={product.title}
							className="h-full w-full object-cover"
						/>
					</div>
				</div>

				<div>
					<div className="flex flex-wrap items-center gap-2">
						<span className="chip chip-primary">{product.category}</span>
						{product.brand && <span className="chip">{product.brand}</span>}
					</div>
					<h1 className="mt-3 font-display text-4xl font-bold leading-tight sm:text-5xl">
						{product.title}
					</h1>

					<div className="mt-4 flex items-center gap-3">
						<div className="flex items-center gap-1 rounded-md border-1 border-foreground px-2 py-1 font-bold">
							<Star className="h-4 w-4 fill-primary text-primary" />
							{product.rating.toFixed(1)}
						</div>
						<div className="flex items-center gap-1 text-sm font-semibold text-muted-foreground">
							<Package className="h-4 w-4" />
							{product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
						</div>
					</div>

					<div className="mt-6 flex items-end gap-3">
						<span className="font-display text-5xl font-bold text-primary">
							R{finalPrice.toFixed(2)}
						</span>
						{product.discountPercentage > 0 && (
							<>
								<span className="text-lg font-semibold text-muted-foreground line-through">
									R{product.price.toFixed(2)}
								</span>
								<span className="chip chip-primary">
									-{product.discountPercentage.toFixed(0)}%
								</span>
							</>
						)}
					</div>

					<p className="mt-6 text-base leading-relaxed text-foreground/90">
						{product.description}
					</p>

					<div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3">
						<Specification
							label="Category"
							value={product.category}
							icon={<Tag className="h-4 w-4" />}
						/>
						<Specification label="Brand" value={product.brand ?? '-'} />
						<Specification label="Stock" value={String(product.stock)} />
						<Specification label="Rating" value={product.rating.toFixed(2)} />
						<Specification label="Price" value={`R${product.price.toFixed(2)}`} />
						<Specification
							label="Discount"
							value={`${product.discountPercentage.toFixed(1)}%`}
						/>
					</div>

					<div className="mt-8 flex flex-wrap gap-3">
						<button
							onClick={() => onGoToNavigateClick(`/dashboard/cart`)}
							className="btn-pop"
							disabled={product.stock <= 0}
						>
							{product.stock > 0 ? 'Add to cart' : 'Sold out'}
						</button>
						<button
							onClick={() => onGoToNavigateClick(`/dashboard/catalog`)}
							className="btn-outline-pop"
						>
							Keep browsing
						</button>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Product
