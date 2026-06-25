interface HeaderProps {
	onGoToNavigateClick: (path: string) => void
}

function Header({ onGoToNavigateClick }: HeaderProps) {
	return (
		<header className="sticky top-0 z-40 border-b-1 border-foreground bg-background">
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
					{/* ADD_PROFILE_BUTTON_HERE */}
					{/* ADD_SIGN_IN_BUTTON_HERE */}
				</nav>
			</div>
		</header>
	)
}

export default Header
