import React, { useEffect, useState } from 'react'
import {
	ContentContainer,
	PageLayout,
	TableHead,
	TableRow,
	TableData,
	StyledCheckbox,
} from '../../styles'
import Controls from '../../components/Controls'

import { useHistory, useLocation } from 'react-router-dom'
import AddIcon from '../../assets/icons/add.svg'
import Axios from 'axios'
import { usersEndpoint } from '../../api'
import { useRecoilState, useRecoilValue } from 'recoil'
import { userAtom, userCheckedAtom } from '../../recoil/atoms'
import Table from '../../components/Table'
import {
	formatDate,
	renderWithLoader,
	titleGenerator,
} from '../../utils/helperFunctions'

import { v4 as uuid } from 'uuid'
import { selectedUsers } from '../../recoil/selectors'
import { IconButton } from '@material-ui/core'
import { AddCircle, Delete } from '@material-ui/icons'
import DeleteModal from '../../components/Modals/DeleteModal'

function UserPage() {
	const history = useHistory()
	const location = useLocation().pathname
	const [users, setUsers] = useRecoilState(userAtom)
	const [checked, setChecked] = useRecoilState(userCheckedAtom)
	const selected = useRecoilValue(selectedUsers)

	const [isModalOpen, setIsModalOpen] = useState(false)
	const toggleModal = () => setIsModalOpen(!isModalOpen)

	console.log({ selected })
	const navHandler = (to) => {
		history.push(`${location}/${to}`)
	}

	useEffect(() => {
		Axios.get(usersEndpoint)
			.then(({ data }) => setUsers(data))
			.catch((e) => console.log(e))
	}, [isModalOpen])

	const userHeading = [
		'Select',
		'Fullname',
		'Username',
		'Contact',
		'Email',
		'Assigned Role',
		'Created On',
	]

	const renderUserHeading = userHeading.map((heading) => (
		<TableHead key={uuid()}>{heading}</TableHead>
	))

	const checkHandler = (e, _id) => {
		setChecked({ ...checked, [_id]: e.target.checked })
	}

	const deleteHandler = async () => {
		try {
			await Axios.patch(usersEndpoint, selected)
			toggleModal()
			setChecked({})
		} catch (error) {
			alert(error)
		}
	}

	const renderUserData =
		users &&
		users.map(
			({
				_id,
				firstName,
				lastName,
				userName,
				contact,
				email,
				roleId,
				createdAt,
			}) => {
				return (
					<TableRow key={uuid()}>
						<TableData>
							<StyledCheckbox
								onChange={(e) => checkHandler(e, _id)}
								checked={checked[_id] || false}
								type='checkbox'
							/>
						</TableData>

						<TableData>{`${firstName} ${lastName}`}</TableData>
						<TableData>{userName}</TableData>
						<TableData>{contact}</TableData>
						<TableData>{email}</TableData>
						<TableData>{roleId.name}</TableData>
						<TableData>{formatDate(createdAt)}</TableData>
					</TableRow>
				)
			}
		)

	return (
		<>
			<Controls title={titleGenerator(selected, 'Users')}>
				{selected.length ? (
					<IconButton color='secondary' onClick={toggleModal}>
						<Delete />
					</IconButton>
				) : (
					<IconButton color='primary' onClick={() => navHandler('add')}>
						<AddCircle />
					</IconButton>
				)}
			</Controls>
			<DeleteModal
				open={isModalOpen}
				onClose={toggleModal}
				count={selected.length}
				deleteHandler={deleteHandler}
			/>
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
