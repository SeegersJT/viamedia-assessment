import { ArrowLeft, Building2, GraduationCap, Mail, MapPin, Phone, UserIcon } from 'lucide-react'
import Field from '@/components/field/Field.component'
import type { UserItem } from '@/redux/types/Auth.type'

interface ProfileProps {
	data: UserItem
	onGoToNavigateClick: (path: string) => void
}

function Profile({ data, onGoToNavigateClick }: ProfileProps) {
	const fullAddress = data.address
		? [
				data.address.address,
				data.address.city,
				data.address.state,
				data.address.postalCode,
				data.address.country,
			]
				.filter(Boolean)
				.join(', ')
		: null

	return (
		<div className="mx-auto max-w-4xl px-4 py-10">
			<span className="chip chip-primary">Account</span>
			<h1 className="mt-3 font-display text-4xl font-bold leading-tight sm:text-5xl">
				Your <span className="text-primary">profile</span>
			</h1>
			<p className="mt-2 text-sm text-muted-foreground">
				Read-only view of your account data from the API.
			</p>

			<div className="card-pop mt-8 flex flex-col items-start gap-6 p-6 sm:flex-row sm:items-center">
				<img
					src={data.avatar}
					alt={data.name}
					className="h-24 w-24 rounded-full border-1 border-foreground bg-background object-cover"
				/>
				<div className="min-w-0">
					<h2 className="font-display text-2xl font-bold">
						{data.firstName} {data.maidenName ? `"${data.maidenName}" ` : ''}
						{data.lastName}
					</h2>
					<p className="text-sm text-muted-foreground">
						@{data.username} · ID #{data.id}
					</p>
					{data.role && (
						<span className="mt-2 inline-block rounded-md border-1 border-foreground bg-primary px-2 py-0.5 text-xs font-bold uppercase text-primary-foreground">
							{data.role}
						</span>
					)}
				</div>
			</div>

			<div className="mt-6 grid gap-4 sm:grid-cols-2">
				<Field icon={<Mail className="h-4 w-4" />} label="Email" value={data.email} />
				<Field icon={<Phone className="h-4 w-4" />} label="Phone" value={data.phone} />
				<Field
					icon={<UserIcon className="h-4 w-4" />}
					label="Age / Gender"
					value={[data.age, data.gender].filter(Boolean).join(' · ')}
				/>
				<Field
					icon={<UserIcon className="h-4 w-4" />}
					label="Birth date"
					value={data.birthDate}
				/>
				<Field icon={<MapPin className="h-4 w-4" />} label="Address" value={fullAddress} />
				<Field
					icon={<GraduationCap className="h-4 w-4" />}
					label="University"
					value={data.university}
				/>
				<Field
					icon={<Building2 className="h-4 w-4" />}
					label="Company"
					value={
						data.company
							? [data.company.title, data.company.department, data.company.name]
									.filter(Boolean)
									.join(' · ')
							: null
					}
				/>
				<Field
					icon={<UserIcon className="h-4 w-4" />}
					label="Physical"
					value={[
						data.bloodGroup && `Blood ${data.bloodGroup}`,
						data.height && `${data.height} cm`,
						data.weight && `${data.weight} kg`,
						data.eyeColor && `${data.eyeColor} eyes`,
						data.hair?.color && `${data.hair.color} ${data.hair.type ?? 'hair'}`,
					]
						.filter(Boolean)
						.join(' · ')}
				/>
			</div>

			<p className="mt-8 text-sm">
				<button
					onClick={() => onGoToNavigateClick('/dashboard/catalog')}
					className="mb-6 inline-flex items-center gap-1 text-sm font-bold hover:text-primary hover:cursor-pointer"
				>
					<ArrowLeft className="h-4 w-4" /> Back to catalog
				</button>
			</p>
		</div>
	)
}

export default Profile
