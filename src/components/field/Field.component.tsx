import type React from 'react'

function Field({ label, children }: { label: string; children: React.ReactNode }) {
	return (
		<label className="block">
			<span className="text-xs font-bold uppercase tracking-wide">{label}</span>
			<div className="mt-1">{children}</div>
		</label>
	)
}

export default Field
