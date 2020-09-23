import React, { useEffect } from 'react'
import {
	ContentContainer,
	IconButton,
	PageLayout,
	TableHead,
	TableRow,
	TableData,
} from '../../styles'
import Controls from '../../components/Controls'

import { useHistory, useLocation } from 'react-router-dom'
import AddIcon from '../../assets/icons/add.svg'
import Axios from 'axios'
import { usersEndpoint } from '../../api'
import { useRecoilState } from 'recoil'
import { userAtom } from '../../recoil/atoms'
import Table from '../../components/Table'
import { renderWithLoader } from '../../utils/helperFunctions'

import { v4 as uuid } from 'uuid'

function UserPage() {
	const history = useHistory()
	const location = useLocation().pathname
	const [users, setUsers] = useRecoilState(userAtom)
	console.log(users)
	const navHandler = (to) => {
		history.push(`${location}/${to}`)
	}

	useEffect(() => {
		Axios.get(usersEndpoint)
			.then(({ data }) => setUsers(data))
			.catch((e) => console.log(e))
	}, [])

	const userHeading = [
		'Fullname',
		'Username',
		'Contact',
		'Email',
		'Assigned Role',
	]

	const renderUserHeading = userHeading.map((heading) => (
		<TableHead key={uuid()}>{heading}</TableHead>
	))

	const renderUserData =
		users &&
		users.map(
			({ _id, firstName, lastName, userName, contact, email, roleId }) => {
				return (
					<TableRow key={uuid()}>
						<TableData>{`${firstName} ${lastName}`}</TableData>
						<TableData>{userName}</TableData>
						<TableData>{contact}</TableData>
						<TableData>{email}</TableData>
						<TableData>{roleId.name}</TableData>
					</TableRow>
				)
			}
		)

	return (
		<>
			<Controls title='User'>
				<IconButton onClick={() => navHandler('add')} src={AddIcon} />
			</Controls>
			<ContentContainer>
				{renderWithLoader(
					users,
					<Table headings={renderUserHeading}>{renderUserData}</Table>
				)}
			</ContentContainer>
		</>
	)
}

export default UserPage
