function Footer() {
	return (
		<footer className="mt-16 border-t-1 border-foreground">
			<div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-2 px-4 py-6 sm:flex-row sm:items-center">
				<p className="text-sm font-medium">© {new Date().getFullYear()} Product Hub</p>
				<p className="text-xs text-muted-foreground">Powered by coffee.</p>
			</div>
		</footer>
	)
}

export default Footer
