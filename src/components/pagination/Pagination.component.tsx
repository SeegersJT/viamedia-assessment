import { ChevronLeft, ChevronRight } from 'lucide-react'

interface PaginationProps {
	page: number
	totalPages: number
	loading: boolean
	onPageChange: (n: number) => void
}

function Pagination({ page, totalPages, loading, onPageChange }: PaginationProps) {
	return (
		<div className="mt-10 flex items-center justify-center gap-2">
			<button
				className="btn-outline-pop disabled:opacity-40"
				disabled={loading || page <= 1}
				onClick={() => onPageChange(page - 1)}
				aria-label="Previous page"
			>
				<ChevronLeft className="h-4 w-4" />
				Prev
			</button>
			<span className="px-3 text-sm font-bold">
				{page} / {totalPages}
			</span>
			<button
				className="btn-pop disabled:opacity-40"
				disabled={loading || page >= totalPages}
				onClick={() => onPageChange(page + 1)}
				aria-label="Next page"
			>
				Next
				<ChevronRight className="h-4 w-4" />
			</button>
		</div>
	)
}

export default Pagination
