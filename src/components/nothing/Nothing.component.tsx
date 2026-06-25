interface NothingProps {
	query: string
}

function Nothing({ query }: NothingProps) {
	return (
		<div className="card-pop p-10 text-center">
			<h3 className="font-display text-2xl font-bold">No matches</h3>
			<p className="mt-2 text-muted-foreground">
				{query ? (
					<>
						We couldn't find any products for "
						<span className="font-semibold text-foreground">{query}</span>".
					</>
				) : (
					<>No products match the selected filters.</>
				)}
			</p>
		</div>
	)
}

export default Nothing
