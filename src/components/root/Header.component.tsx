import type { UserItem } from '@/redux/types/Auth.type'

interface HeaderProps {
	isAuthenticated: boolean
	user: UserItem | null
	onGoToNavigateClick: (path: string) => void
}

function Header({ isAuthenticated, user, onGoToNavigateClick }: HeaderProps) {
	return (
		<header className="sticky top-0 z-40 border-b-1 bg-background">
			<div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3">
				<button
					onClick={() => onGoToNavigateClick('/')}
					className="flex min-w-0 items-center gap-2 hover:cursor-pointer"
				>
					<span className="grid h-9 w-9 shrink-0 place-items-center rounded-md border-1 border-foreground bg-primary text-primary-foreground font-display text-lg font-bold">
						P
					</span>
					<span className="truncate font-display text-xl font-bold tracking-tight">
						Product<span className="text-primary">Hub</span>
					</span>
				</button>
				<nav className="flex items-center gap-2">
					<button
						onClick={() => onGoToNavigateClick('/')}
						className="hidden rounded-md px-3 py-1.5 text-sm font-semibold hover:bg-primary hover:text-primary-foreground sm:inline hover:cursor-pointer"
					>
						Dashboard
					</button>
					<button
						onClick={() => onGoToNavigateClick('/dashboard/catalog')}
						className="hidden rounded-md px-3 py-1.5 text-sm font-semibold hover:bg-primary hover:text-primary-foreground sm:inline hover:cursor-pointer"
					>
						Catalog
					</button>

					{/* ADD_TOGGLE_DARK_MODE_BUTTON_HERE */}

					{isAuthenticated && user ? (
						<div className="flex items-center gap-2">
							<span className="hidden items-center gap-2 rounded-md border-1 border-foreground px-2 py-1 sm:flex">
								<img
									src={user?.avatar}
									alt=""
									className="h-6 w-6 rounded-full border border-foreground"
								/>
								<span className="text-sm font-bold">{user.name}</span>
							</span>
							<button
								onClick={() => {}}
								className="btn-outline-pop !py-1.5 !px-3 text-sm"
							>
								Sign out
							</button>
						</div>
					) : (
						<button
							onClick={() => onGoToNavigateClick('/dashboard/login')}
							className="btn-pop !py-1.5 !px-3 text-sm"
						>
							Sign in
						</button>
					)}
				</nav>
			</div>
		</header>
	)
}

export default Header
