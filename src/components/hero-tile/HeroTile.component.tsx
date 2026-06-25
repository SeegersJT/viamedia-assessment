import type { ProductItem } from '@/redux/types/Product.type'

interface HeroTileProps {
	product?: ProductItem
	onGoToNavigateClick: (path: string) => void
}

function HeroTile({ product, onGoToNavigateClick }: HeroTileProps) {
	if (!product) {
		return (
			<div className="aspect-square animate-pulse rounded-md border-1 border-foreground bg-muted" />
		)
	}
	return (
		<button
			onClick={() => onGoToNavigateClick(`/dashboard/product/${product.id}`)}
			className="group block overflow-hidden rounded-md border-1 border-foreground bg-background hover:cursor-pointer"
		>
			<div className="aspect-square overflow-hidden bg-muted">
				<img
					src={product.thumbnail}
					alt={product.title}
					loading="lazy"
					className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
				/>
			</div>
			<div className="flex items-center justify-between gap-2 px-2 py-1.5">
				<span className="truncate text-xs font-bold">{product.title}</span>
				<span className="font-display text-xs font-bold text-primary">
					R{product.price.toFixed(0)}
				</span>
			</div>
		</button>
	)
}

export default HeroTile
