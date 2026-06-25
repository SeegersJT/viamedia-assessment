function HeroTileSkeleton() {
	return (
		<div className="overflow-hidden rounded-md border-1 border-foreground bg-background">
			<div className="aspect-square animate-pulse bg-muted" />
			<div className="flex items-center justify-between gap-2 px-2 py-1.5">
				<div className="h-3 w-2/3 animate-pulse rounded bg-muted" />
				<div className="h-3 w-8 animate-pulse rounded bg-muted" />
			</div>
		</div>
	)
}

export default HeroTileSkeleton
