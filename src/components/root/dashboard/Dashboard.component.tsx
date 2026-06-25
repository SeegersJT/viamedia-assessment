import { Link } from 'react-router-dom'
import HeroTile from '@/components/hero-tile/HeroTile.component'
import { DashboardFeatures, DashboardStatistics } from './Dashboard.helper'
import { ArrowRight, Search } from 'lucide-react'
import HeroTileSkeleton from '@/components/hero-tile/HeroTileSkeleton.component'
import type { ProductItem } from '@/redux/types/Product.type'

interface DashboardProps {
	productData: ProductItem[]
	totalProducts: number
	productDataLoading: boolean
	onBrowseCatalogClick: () => void
}

function Dashboard({
	productData,
	totalProducts,
	productDataLoading,
	onBrowseCatalogClick,
}: DashboardProps) {
	return (
		<div>
			<section className="border-b-2 border-foreground">
				<div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:py-24 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
					<div>
						<span className="chip chip-primary">The Product Hub</span>
						<h1 className="mt-4 text-5xl font-bold leading-[1.02] sm:text-7xl">
							A catalog <br /> that actually{' '}
							<span className="text-primary">pops.</span>
						</h1>
						<p className="mt-5 max-w-xl text-lg text-muted-foreground">
							Search a live catalog, filter by category, and dig into the full spec
							sheet for every product. Sign in to add, edit, and delete.
						</p>
						<div className="mt-7 flex flex-wrap gap-3">
							<button onClick={onBrowseCatalogClick} className="btn-pop text-base">
								Browse catalog
								<ArrowRight className="h-4 w-4" />
							</button>
							<button onClick={() => {}} className="btn-outline-pop text-base">
								Sign in
							</button>
						</div>
						<dl className="mt-10 grid max-w-md grid-cols-3 gap-4">
							{DashboardStatistics(totalProducts).map(stat => (
								<div
									key={stat.value}
									className="rounded-lg border-1 border-foreground bg-background p-3 shadow-[3px_3px_0_0_var(--primary)]"
								>
									<dt className="font-display text-2xl font-bold text-primary">
										{stat.key}
									</dt>
									<dd className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
										{stat.value}
									</dd>
								</div>
							))}
						</dl>
					</div>

					<div className="relative mx-auto w-full max-w-md lg:max-w-none">
						<div className="card-pop rotate-[-2deg] overflow-hidden">
							<div className="flex items-center justify-between border-b-2 border-foreground bg-primary px-4 py-2 text-primary-foreground">
								<span className="font-display text-sm font-bold">producthub</span>
								<Search className="h-4 w-4" />
							</div>
							<div className="grid grid-cols-2 gap-3 p-3">
								{productDataLoading
									? Array.from({ length: 4 }).map((_, i) => (
											<HeroTileSkeleton key={i} />
										))
									: (productData.length
											? productData
											: Array.from({ length: 4 })
										).map((product, index) => (
											<HeroTile
												key={index}
												product={product as ProductItem | undefined}
											/>
										))}
							</div>
						</div>
						<div className="absolute -right-3 -top-3 hidden rotate-6 rounded-lg border-1 border-foreground bg-primary px-3 py-1.5 font-display text-sm font-bold text-primary-foreground shadow-[3px_3px_0_0_var(--foreground)] sm:block">
							live data
						</div>
					</div>
				</div>
			</section>

			<section className="mx-auto max-w-6xl px-4 py-16 sm:py-20">
				<div className="mb-10 max-w-2xl">
					<span className="chip">What's inside</span>
					<h2 className="mt-3 text-3xl font-bold sm:text-4xl">
						Everything a catalog should be. Nothing it shouldn't.
					</h2>
				</div>
				<div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
					{DashboardFeatures.map(feature => (
						<div key={feature.title} className="card-pop p-5">
							<span className="grid h-10 w-10 place-items-center rounded-md border-1 border-foreground bg-primary text-primary-foreground">
								<feature.icon className="h-5 w-5" />
							</span>
							<h3 className="mt-4 font-display text-lg font-bold">{feature.title}</h3>
							<p className="mt-1 text-sm text-muted-foreground">{feature.body}</p>
						</div>
					))}
				</div>
			</section>

			<section className="mx-auto mb-16 max-w-6xl px-4">
				<div className="card-pop flex flex-col items-start justify-between gap-5 bg-primary p-8 text-primary-foreground sm:flex-row sm:items-center sm:p-10">
					<div>
						<h2 className="text-3xl font-bold sm:text-4xl">Ready to dig in?</h2>
						<p className="mt-2 max-w-md text-base/relaxed">
							Open the catalog and start exploring. No signup required to browse.
						</p>
					</div>
					<Link
						to="/catalog"
						className="inline-flex items-center gap-2 rounded-md border-1 border-foreground bg-background px-5 py-3 font-display text-base font-bold text-foreground shadow-[4px_4px_0_0_var(--foreground)] hover:-translate-x-[2px] hover:-translate-y-[2px] hover:shadow-[6px_6px_0_0_var(--foreground)] transition-all"
					>
						Open the catalog
						<ArrowRight className="h-4 w-4" />
					</Link>
				</div>
			</section>
		</div>
	)
}

export default Dashboard
