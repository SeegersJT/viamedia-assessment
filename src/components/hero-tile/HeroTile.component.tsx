import type { ProductItem } from '@/redux/types/Product.type'
import { Link } from 'react-router-dom'

interface HeroTileProps {
	product?: ProductItem
}

function HeroTile({ product }: HeroTileProps) {
	if (!product) {
		return (
			<div className="aspect-square animate-pulse rounded-md border-1 border-foreground bg-muted" />
		)
	}
	return (
		<Link
			to="/products/$id"
			className="group block overflow-hidden rounded-md border-1 border-foreground bg-background"
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
					${product.price.toFixed(0)}
				</span>
			</div>
		</Link>
	)
}

export default HeroTile
