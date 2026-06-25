import { Search, ShieldCheck, Sparkles, Star, Tags, Zap } from 'lucide-react'

export const DashboardStatistics = (totalProducts: number) => [
	{ key: totalProducts || 0, value: 'products' },
	{ key: '20+', value: 'categories' },
	{ key: '1', value: 'click away' },
]

export const DashboardFeatures = [
	{
		icon: Search,
		title: 'Instant search',
		body: 'Debounced, server-backed search over titles, brands and descriptions.',
	},
	{
		icon: Tags,
		title: 'Multi-category filter',
		body: 'Pick any combination of categories and refine the grid on the fly.',
	},
	{
		icon: Zap,
		title: 'Pagination, sorted',
		body: 'Fast page navigation that stays in the URL for easy sharing.',
	},
	{
		icon: Sparkles,
		title: 'Full product detail',
		body: 'Description, gallery, brand, stock and rating all on one page.',
	},
	{
		icon: ShieldCheck,
		title: 'Auth-gated CRUD',
		body: 'Sign in to add, edit or remove products with optimistic feedback.',
	},
	{
		icon: Star,
		title: 'Built to pop',
		body: 'Bold neo-brutalist styling with a single, punchy accent color.',
	},
]
