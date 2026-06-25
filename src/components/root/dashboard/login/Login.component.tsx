import { ChevronLeft, Loader2, LogIn } from 'lucide-react'
import type React from 'react'

interface LoginProps {
	username: string
	password: string
	authenticationLoading: boolean
	onSubmit: (e: React.SubmitEvent<HTMLFormElement>) => void
	onUsernameChange: (username: string) => void
	onPasswordChange: (password: string) => void
	onGoToNavigateClick: (path: string) => void
}

function Login({
	username,
	password,
	authenticationLoading,
	onSubmit,
	onUsernameChange,
	onPasswordChange,
	onGoToNavigateClick,
}: LoginProps) {
	return (
		<div className="mx-auto max-w-md px-4 py-12 sm:py-20">
			<span className="chip chip-primary">Members</span>
			<h1 className="mt-3 font-display text-4xl font-bold leading-tight sm:text-5xl">
				Sign in to <span className="text-primary">manage</span> the catalog.
			</h1>
			<p className="mt-3 text-sm text-muted-foreground">
				Use any DummyJSON user. Defaults are pre-filled below. Just hit sign in.
			</p>

			<form onSubmit={e => onSubmit(e)} className="card-pop mt-8 space-y-4 p-6">
				<div>
					<label className="text-xs font-bold uppercase tracking-wide">Username</label>
					<input
						value={username}
						onChange={e => onUsernameChange(e.target.value)}
						required
						autoComplete="username"
						maxLength={64}
						className="mt-1 w-full rounded-md border-1 border-foreground bg-background px-3 py-2 text-base outline-none focus:shadow-[3px_3px_0_0_var(--primary)]"
					/>
				</div>
				<div>
					<label className="text-xs font-bold uppercase tracking-wide">Password</label>
					<input
						type="password"
						value={password}
						onChange={e => onPasswordChange(e.target.value)}
						required
						autoComplete="current-password"
						maxLength={128}
						className="mt-1 w-full rounded-md border-1 border-foreground bg-background px-3 py-2 text-base outline-none focus:shadow-[3px_3px_0_0_var(--primary)]"
					/>
				</div>

				<button type="submit" disabled={authenticationLoading} className="btn-pop w-full">
					{authenticationLoading ? (
						<Loader2 className="h-4 w-4 animate-spin" />
					) : (
						<LogIn className="h-4 w-4" />
					)}
					{authenticationLoading ? 'Signing in…' : 'Sign in'}
				</button>

				<p className="text-center text-xs text-muted-foreground">
					Demo: <code className="font-bold">emilys</code>/{' '}
					<code className="font-bold">emilyspass</code>
				</p>
			</form>

			<div className="mt-6 flex justify-center text-sm">
				<button
					onClick={() => onGoToNavigateClick('/')}
					className="inline-flex items-center gap-1 font-semibold underline hover:text-primary hover:cursor-pointer"
				>
					<ChevronLeft className="h-4 w-4" /> Back to dashboard
				</button>
			</div>
		</div>
	)
}

export default Login
