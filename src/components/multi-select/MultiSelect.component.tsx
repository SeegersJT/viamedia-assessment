import { useEffect, useRef, useState } from 'react'
import { Check, SlidersHorizontal } from 'lucide-react'

interface MultiSelectProps<T extends string> {
	all: T[]
	selected: T[]
	onToggle: (item: T) => void
	onClear: () => void
	label?: string
	renderItem?: (item: T) => string
	isLoading?: boolean
}

function MultiSelect<T extends string>({
	all,
	selected,
	onToggle,
	onClear,
	label = 'Options',
	renderItem = item => item.replace(/-/g, ' '),
	isLoading = false,
}: MultiSelectProps<T>) {
	const [open, setOpen] = useState(false)
	const ref = useRef<HTMLDivElement>(null)

	useEffect(() => {
		if (!open) return

		const onDocClick = (e: MouseEvent) => {
			if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
		}

		const onEsc = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)

		document.addEventListener('mousedown', onDocClick)
		document.addEventListener('keydown', onEsc)

		return () => {
			document.removeEventListener('mousedown', onDocClick)
			document.removeEventListener('keydown', onEsc)
		}
	}, [open])

	return (
		<div ref={ref} className="relative">
			<button
				type="button"
				onClick={() => setOpen(value => !value)}
				aria-expanded={open}
				aria-haspopup="listbox"
				className="flex h-full w-full items-center justify-between gap-2 rounded-lg border-1 border-foreground bg-background px-4 py-3 text-sm font-bold shadow-[3px_3px_0_0_var(--primary)] hover:-translate-x-[1px] hover:-translate-y-[1px] hover:shadow-[4px_4px_0_0_var(--primary)] sm:w-64 hover:cursor-pointer"
			>
				<span className="flex items-center gap-2">
					<SlidersHorizontal className="h-4 w-4" />
					{label}
				</span>
				<span className="rounded-md border-1 border-foreground bg-primary px-2 py-0.5 text-xs text-primary-foreground">
					{selected.length}
				</span>
			</button>

			{open && (
				<div
					role="listbox"
					aria-multiselectable="true"
					className="absolute right-0 z-30 mt-2 w-72 max-w-[90vw] overflow-hidden rounded-lg border-1 border-foreground bg-background shadow-[6px_6px_0_0_var(--primary)]"
				>
					<div className="flex items-center justify-between border-b-2 border-foreground px-3 py-2">
						<span className="text-xs font-bold uppercase tracking-wide">
							{selected.length} selected
						</span>
						<button
							onClick={onClear}
							disabled={selected.length === 0}
							className="text-xs font-bold underline underline-offset-4 disabled:opacity-40 hover:cursor-pointer"
						>
							Clear
						</button>
					</div>
					<ul className="max-h-72 overflow-y-auto p-1">
						{isLoading || all.length === 0 ? (
							<li className="px-3 py-4 text-sm text-muted-foreground">
								{isLoading ? 'Loading…' : 'No options available'}
							</li>
						) : (
							all.map(item => {
								const isOn = selected.includes(item)
								return (
									<li key={item}>
										<button
											type="button"
											role="option"
											aria-selected={isOn}
											onClick={() => onToggle(item)}
											className={`flex w-full items-center justify-between gap-2 rounded-md px-3 py-2 text-left text-sm font-medium hover:bg-muted hover:cursor-pointer ${
												isOn ? 'bg-muted' : ''
											}`}
										>
											<span className="truncate capitalize">
												{renderItem(item)}
											</span>
											<span
												className={`grid h-5 w-5 shrink-0 place-items-center rounded border-1 border-foreground ${
													isOn
														? 'bg-primary text-primary-foreground'
														: 'bg-background'
												}`}
											>
												{isOn && <Check className="h-3 w-3" />}
											</span>
										</button>
									</li>
								)
							})
						)}
					</ul>
				</div>
			)}
		</div>
	)
}

export default MultiSelect
