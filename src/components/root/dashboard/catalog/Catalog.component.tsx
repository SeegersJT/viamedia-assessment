import GridSkeleton from '@/components/grid/GridSkeleton.component'
import MultiSelect from '@/components/multi-select/MultiSelect.component'
import Nothing from '@/components/nothing/Nothing.component'
import Pagination from '@/components/pagination/Pagination.component'
import ProductCard from '@/components/product-card/ProductCard.component'
import type { ProductItem } from '@/redux/types/Product.type'
import { Plus, Search, X } from 'lucide-react'

interface CatalogProps {
	productData: ProductItem[]
	categoryData: string[]
	pagination: { page: number; limit: number; totalPages: number }
	search: string
	selectedCategories: string[]
	isAuthenticated: boolean
	productDataLoading: boolean
	categoryDataLoading: boolean
	deletingProductId: number | null
	onPageChange: (page: number) => void
	onSearchChange: (value: string) => void
	onCategoryToggle: (category: string) => void
	onClearCategories: () => void
	onGoToNavigateClick: (path: string) => void
	onProductFormOpenClick: (productId: number, open: boolean, clear: boolean) => void
	onRemoveClick: (productId: number) => void
}

function Catalog({
	productData,
	categoryData,
	pagination,
	search,
	selectedCategories,
	isAuthenticated,
	productDataLoading,
	categoryDataLoading,
	deletingProductId,
	onPageChange,
	onSearchChange,
	onCategoryToggle,
	onClearCategories,
	onGoToNavigateClick,
	onProductFormOpenClick,
	onRemoveClick,
}: CatalogProps) {
	const hasResults = productData && productData.length > 0

	return (
		<div className="mx-auto max-w-6xl px-4 py-8 sm:py-12">
			<section className="mb-8">
				<span className="chip chip-primary">Catalog</span>
				<h1 className="mt-3 text-4xl font-bold leading-[1.05] sm:text-5xl">
					Browse the <span className="text-primary">full lineup</span>
				</h1>
				<p className="mt-3 max-w-xl text-base text-muted-foreground">
					Search, filter by category, and tap any card for the spec sheet.
				</p>

				<div className="mt-6 flex flex-col gap-3 sm:flex-row">
					<div className="flex flex-1 items-center gap-2 rounded-lg border border-foreground bg-background p-2 shadow-[3px_3px_0_0_var(--primary)] transition-all focus-within:-translate-x-[3px] focus-within:-translate-y-[3px] focus-within:shadow-[6px_6px_0_0_var(--primary)]">
						<Search className="ml-2 h-5 w-5 shrink-0 text-muted-foreground" />
						<input
							value={search}
							onChange={e => onSearchChange(e.target.value)}
							placeholder="Search products…"
							className="w-full bg-transparent px-1 py-2 text-base outline-none placeholder:text-muted-foreground"
							aria-label="Search products"
						/>
						{search && (
							<button
								onClick={() => onSearchChange('')}
								className="rounded-md px-2 py-1 text-xs font-semibold hover:bg-muted"
								aria-label="Clear search"
							>
								<X className="h-4 w-4" />
							</button>
						)}
					</div>
					<MultiSelect
						all={categoryData}
						selected={selectedCategories}
						onToggle={onCategoryToggle}
						onClear={onClearCategories}
						isLoading={categoryDataLoading}
					/>
				</div>
			</section>

			<div className="mb-4 flex items-end justify-between gap-4">
				<div className="min-w-0">
					<h2 className="truncate text-xl font-bold sm:text-2xl">
						{search ? (
							<>
								Results for "<span className="text-primary">{search}</span>"
							</>
						) : (
							'All products'
						)}
					</h2>
					<p className="text-sm text-muted-foreground">
						Page {pagination.page} of {pagination.totalPages}
					</p>
				</div>
				{isAuthenticated && (
					<button
						onClick={() => onProductFormOpenClick(0, true, true)}
						className="btn-pop shrink-0"
					>
						<Plus className="h-4 w-4" />
						<span className="hidden sm:inline">New product</span>
					</button>
				)}
			</div>

			{productDataLoading ? (
				<GridSkeleton limit={pagination.limit} />
			) : !hasResults ? (
				<Nothing query={search} />
			) : (
				<div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
					{productData.map(product => (
						<ProductCard
							key={product.id}
							product={product}
							canManage={isAuthenticated}
							deletingProductId={deletingProductId}
							onGoToNavigateClick={onGoToNavigateClick}
							onEditClick={onProductFormOpenClick}
							onRemoveClick={onRemoveClick}
						/>
					))}
				</div>
			)}

			{hasResults && (
				<Pagination
					page={pagination.page}
					totalPages={pagination.totalPages}
					loading={productDataLoading}
					onPageChange={onPageChange}
				/>
			)}
		</div>
	)
}

export default Catalog
