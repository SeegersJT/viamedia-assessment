import Field from '@/components/field/Field.component'
import type { ProductForm } from '@/containers/root/dashboard/product/ProductFormModal.helper'
import { Loader2, Save, X } from 'lucide-react'
import type React from 'react'

interface ProductFormModalProps {
	form: ProductForm
	editing: boolean
	loading: boolean
	onClose: () => void
	onFormDataChange: (value: string, key: string) => void
	onFormSubmitClick: (e: React.SubmitEvent<HTMLFormElement>) => void
}

function ProductFormModal({
	form,
	editing,
	loading,
	onClose,
	onFormDataChange,
	onFormSubmitClick,
}: ProductFormModalProps) {
	return (
		<div
			className="fixed inset-0 z-50 grid place-items-center bg-foreground/40 p-4"
			onClick={onClose}
		>
			<div
				className="card-pop relative w-full max-w-lg p-6"
				onClick={e => e.stopPropagation()}
			>
				<button
					onClick={onClose}
					aria-label="Close"
					className="absolute right-3 top-3 rounded-md border-1 border-foreground p-1 hover:bg-primary hover:text-primary-foreground"
				>
					<X className="h-4 w-4" />
				</button>
				<h2 className="font-display text-2xl font-bold">
					{editing ? 'Edit product' : 'New product'}
				</h2>
				<p className="text-sm text-muted-foreground">
					DummyJSON simulates writes - changes succeed but aren't persisted server-side.
				</p>

				<form className="mt-5 space-y-3" onSubmit={onFormSubmitClick}>
					<Field label="Title">
						<input
							value={form.title}
							onChange={e => onFormDataChange(e.target.value, 'title')}
							required
							maxLength={120}
							className="input-pop"
						/>
					</Field>
					<Field label="Description">
						<textarea
							value={form.description}
							onChange={e => onFormDataChange(e.target.value, 'description')}
							rows={3}
							maxLength={1000}
							className="input-pop"
						/>
					</Field>
					<div className="grid grid-cols-2 gap-3">
						<Field label="Price (R)">
							<input
								type="number"
								step="0.01"
								min="0"
								value={form.price}
								onChange={e => onFormDataChange(e.target.value, 'price')}
								className="input-pop"
							/>
						</Field>
						<Field label="Stock">
							<input
								type="number"
								min="0"
								value={form.stock}
								onChange={e => onFormDataChange(e.target.value, 'stock')}
								className="input-pop"
							/>
						</Field>
						<Field label="Category">
							<input
								value={form.category}
								onChange={e => onFormDataChange(e.target.value, 'category')}
								maxLength={64}
								className="input-pop"
							/>
						</Field>
						<Field label="Brand">
							<input
								value={form.brand}
								onChange={e => onFormDataChange(e.target.value, 'brand')}
								maxLength={64}
								className="input-pop"
							/>
						</Field>
					</div>

					<div className="flex justify-end gap-2 pt-2">
						<button type="button" onClick={onClose} className="btn-outline-pop">
							Cancel
						</button>
						<button type="submit" disabled={loading} className="btn-pop">
							{loading ? (
								<Loader2 className="h-4 w-4 animate-spin" />
							) : (
								<Save className="h-4 w-4" />
							)}
							{editing ? 'Save changes' : 'Create'}
						</button>
					</div>
				</form>
			</div>
		</div>
	)
}

export default ProductFormModal
