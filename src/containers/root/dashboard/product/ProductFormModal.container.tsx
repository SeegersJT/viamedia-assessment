import ProductFormModal from '@/components/root/dashboard/product/ProductFormModal.component'
import type { ProductForm } from '@/containers/root/dashboard/product/ProductFormModal.helper'
import { useAppDispatch } from '@/hooks/useAppDispatch'
import { useAppSelector } from '@/hooks/useAppSelector'
import { requestCreateProduct, requestUpdateProduct } from '@/redux/actions/Product.action'
import type React from 'react'
import { useEffect, useState } from 'react'

interface ProductFormModalContainerProps {
	onClose: () => void
}

const EMPTY_FORM: ProductForm = {
	title: '',
	description: '',
	price: 0,
	stock: 0,
	category: '',
	brand: '',
}

function ProductFormModalContainer({ onClose }: ProductFormModalContainerProps) {
	const dispatch = useAppDispatch()

	const { productById, formSubmitLoading } = useAppSelector(state => state.product)

	const editing = productById !== null

	const [form, setForm] = useState<ProductForm>(EMPTY_FORM)

	useEffect(() => {
		if (productById) {
			setForm({
				title: productById.title,
				description: productById.description ?? '',
				price: Number(productById.price),
				stock: Number(productById.stock),
				category: productById.category ?? '',
				brand: productById.brand ?? '',
			})
		} else {
			setForm(EMPTY_FORM)
		}
	}, [productById])

	function handleFormDataChange(value: string, key: string) {
		setForm(prev => ({ ...prev, [key]: value }))
	}

	function handleFormSubmitClick(e: React.SubmitEvent<HTMLFormElement>) {
		e.preventDefault()
		if (editing) {
			dispatch(requestUpdateProduct(productById.id, form, onClose))
		} else {
			dispatch(requestCreateProduct(form, onClose))
		}
	}

	return (
		<ProductFormModal
			form={form}
			editing={editing}
			loading={formSubmitLoading}
			onClose={onClose}
			onFormDataChange={handleFormDataChange}
			onFormSubmitClick={handleFormSubmitClick}
		/>
	)
}

export default ProductFormModalContainer
