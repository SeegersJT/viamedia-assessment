import type React from 'react'

interface FieldProps {
	icon?: React.ReactNode
	label: string
	value?: string | number | null
	children?: React.ReactNode
}

function Field({ icon, label, value, children }: FieldProps) {
	if (!value && !children) return null

	return (
		<label className="block">
			<span className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide">
				{icon}
				{label}
			</span>
			<div className="mt-1 text-sm text-muted-foreground">{children ?? value}</div>
		</label>
	)
}

export default Field
