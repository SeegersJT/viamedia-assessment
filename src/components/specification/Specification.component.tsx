import type React from 'react'

function Specification({
	label,
	value,
	icon,
}: {
	label: string
	value: string
	icon?: React.ReactNode
}) {
	return (
		<div className="rounded-lg border-1 border-foreground p-3">
			<p className="flex items-center gap-1 text-[0.65rem] font-bold uppercase tracking-wide text-muted-foreground">
				{icon}
				{label}
			</p>
			<p className="mt-1 font-display text-base font-bold capitalize">{value}</p>
		</div>
	)
}

export default Specification
