function ProductSkeleton() {
	return (
		<div className="mx-auto max-w-6xl px-4 py-8 sm:py-12">
			<div className="mb-6 h-5 w-32 animate-pulse rounded-md bg-muted" />

			<div className="grid gap-8 lg:grid-cols-2">
				<div className="card-pop aspect-square animate-pulse overflow-hidden bg-muted" />

				<div>
					<div className="flex flex-wrap items-center gap-2">
						<div className="h-6 w-24 animate-pulse rounded-full bg-muted" />
						<div className="h-6 w-16 animate-pulse rounded-full bg-muted" />
					</div>

					<div className="mt-3 space-y-2">
						<div className="h-10 w-3/4 animate-pulse rounded-md bg-muted" />
						<div className="h-10 w-1/2 animate-pulse rounded-md bg-muted" />
					</div>

					<div className="mt-4 flex items-center gap-3">
						<div className="h-8 w-16 animate-pulse rounded-md bg-muted" />
						<div className="h-5 w-24 animate-pulse rounded-md bg-muted" />
					</div>

					<div className="mt-6 flex items-end gap-3">
						<div className="h-12 w-32 animate-pulse rounded-md bg-muted" />
						<div className="h-6 w-16 animate-pulse rounded-md bg-muted" />
						<div className="h-6 w-12 animate-pulse rounded-full bg-muted" />
					</div>

					<div className="mt-6 space-y-2">
						<div className="h-4 w-full animate-pulse rounded-md bg-muted" />
						<div className="h-4 w-full animate-pulse rounded-md bg-muted" />
						<div className="h-4 w-2/3 animate-pulse rounded-md bg-muted" />
					</div>

					<div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3">
						{Array.from({ length: 6 }).map((_, i) => (
							<div key={i} className="h-14 animate-pulse rounded-md bg-muted" />
						))}
					</div>

					<div className="mt-8 flex flex-wrap gap-3">
						<div className="h-10 w-32 animate-pulse rounded-md bg-muted" />
						<div className="h-10 w-36 animate-pulse rounded-md bg-muted" />
					</div>
				</div>
			</div>
		</div>
	)
}

export default ProductSkeleton
