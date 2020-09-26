import React, { useEffect, useState } from 'react'
import {
	ContentContainer,
	StyledCheckbox,
	TableHead,
	TableData,
	TableRow,
} from '../../styles'
import Controls from '../../components/Controls'
import AddIcon from '../../assets/icons/add.svg'
import { useHistory, useLocation } from 'react-router-dom'
import { useRecoilState, useRecoilValue } from 'recoil'
import { roleAtom, roleCheckedAtom } from '../../recoil/atoms'
import Axios from 'axios'
import { rolesEndpoint } from '../../api'
import Table from '../../components/Table'
import { v4 as uuid } from 'uuid'
import { formatDate, renderWithLoader, titleGenerator } from '../../utils/helperFunctions'
import { selectedRoles } from '../../recoil/selectors'
import { IconButton } from '@material-ui/core'
import { AddCircle, Delete } from '@material-ui/icons'
import DeleteModal from '../../components/Modals/DeleteModal'

function RolePage() {
	const history = useHistory()
	const location = useLocation().pathname
	const [roles, setRoles] = useRecoilState(roleAtom)
	const [checked, setChecked] = useRecoilState(roleCheckedAtom)
	const selected = useRecoilValue(selectedRoles)
	const [isModalOpen, setIsModalOpen] = useState(false)
	const toggleModal = () => setIsModalOpen(!isModalOpen)

	useEffect(() => {
		Axios.get(rolesEndpoint)
			.then(({ data }) => setRoles(data))
			.catch((e) => console.log(e))
	}, [isModalOpen])

	const navHandler = (to) => {
		history.push(`${location}/${to}`)
	}

	const deleteHandler = async () => {
		try {
			await Axios.patch(rolesEndpoint, selected)
			toggleModal()
			setChecked({})
		} catch (error) {
			alert(error)
		}
	}

	const roleHeading = ['Select', 'Name', 'Vendor', 'Total Users', 'Created On']

	const checkHandler = (e, _id) => {
		setChecked({ ...checked, [_id]: e.target.checked })
	}

	const renderHeading = roleHeading.map((heading) => (
		<TableHead key={uuid()}>{heading}</TableHead>
	))

	const renderRoleData =
		roles &&
		roles.map(({ _id, name, vendor, users, createdAt }) => {
			return (
				<TableRow key={uuid()}>
					<TableData>
						<StyledCheckbox
							onChange={(e) => checkHandler(e, _id)}
							checked={checked[_id] || false}
							type='checkbox'
						/>
					</TableData>

					<TableData>{name}</TableData>
					<TableData>{vendor}</TableData>
					<TableData>{users.length}</TableData>
					<TableData>{formatDate(createdAt)}</TableData>
				</TableRow>
			)
		})

	return (
		<>
			<Controls title={titleGenerator(selected, 'Roles')}>
				{selected.length > 0 ? (
					<IconButton color='secondary' onClick={toggleModal}>
						<Delete />
					</IconButton>
				) : (
					<IconButton color='primary' onClick={() => navHandler('add')}>
						<AddCircle />
					</IconButton>
				)}

				{/* <IconButton onClick={() => navHandler('add')} src={AddIcon} /> */}
			</Controls>
			<DeleteModal
				open={isModalOpen}
				onClose={toggleModal}
				count={selected.length}
				deleteHandler={deleteHandler}
			/>
			<ContentContainer>
				{renderWithLoader(
					roles,
					<Table headings={renderHeading}>{renderRoleData}</Table>
				)}
			</ContentContainer>
		</>
	)
}

export default RolePage
