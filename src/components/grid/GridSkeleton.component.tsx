interface GridSkeletonProps {
	limit: number
}

function GridSkeleton({ limit }: GridSkeletonProps) {
	return (
		<div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
			{Array.from({ length: limit }).map((_, index) => (
				<div key={index} className="card-pop overflow-hidden">
					<div className="aspect-square w-full animate-pulse border-b-1 border-foreground bg-muted" />
					<div className="space-y-2 p-4">
						<div className="h-4 w-3/4 animate-pulse rounded bg-muted" />
						<div className="h-4 w-1/2 animate-pulse rounded bg-muted" />
						<div className="mt-4 h-7 w-1/3 animate-pulse rounded bg-muted" />
					</div>
				</div>
			))}
		</div>
	)
}

export default GridSkeleton
