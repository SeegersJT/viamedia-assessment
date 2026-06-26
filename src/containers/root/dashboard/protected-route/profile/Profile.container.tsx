import Profile from '@/components/root/dashboard/protected-route/profile/Profile.component'
import { useAppDispatch } from '@/hooks/useAppDispatch'
import { useAppSelector } from '@/hooks/useAppSelector'
import { requestMe } from '@/redux/actions/Auth.action'
import type { RootState } from '@/redux/types/Root.types'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function ProfileContainer() {
	const dispatch = useAppDispatch()
	const navigate = useNavigate()

	const { userData } = useAppSelector((state: RootState) => state.auth)
	const { accessToken } = useAppSelector((state: RootState) => state.auth)

	const handleOnGoToNavigateClick = (path: string) => {
		navigate(path)
	}

	useEffect(() => {
		if (accessToken) dispatch(requestMe())
	}, [dispatch, accessToken])

	if (!userData) return null

	return <Profile data={userData} onGoToNavigateClick={handleOnGoToNavigateClick} />
}

export default ProfileContainer
