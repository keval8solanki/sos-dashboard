import React, { useEffect } from 'react'
import {
	ContentContainer,
	IconButton,
	StyledCheckbox,
	TableHead,
	TableData,
	TableRow,
} from '../../styles'
import Controls from '../../components/Controls'
import AddIcon from '../../assets/icons/add.svg'
import { useHistory, useLocation } from 'react-router-dom'
import { useRecoilState } from 'recoil'
import { roleAtom, roleCheckedAtom } from '../../recoil/atoms'
import Axios from 'axios'
import { rolesEndpoint } from '../../api'
import Table from '../../components/Table'
import { v4 as uuid } from 'uuid'
import { renderWithLoader } from '../../utils/helperFunctions'

function RolePage() {
	const history = useHistory()
	const location = useLocation().pathname
	const [roles, setRoles] = useRecoilState(roleAtom)
	const [checked, setChecked] = useRecoilState(roleCheckedAtom)

	console.log(roles)
	useEffect(() => {
		Axios.get(rolesEndpoint)
			.then(({ data }) => setRoles(data))
			.catch((e) => console.log(e))
	}, [])

	const navHandler = (to) => {
		history.push(`${location}/${to}`)
	}

	const roleHeading = ['Name', 'Vendor', 'Total Users']

	const checkHandler = (e, _id) => {
		setChecked({ ...checked, [_id]: e.target.checked })
	}

	const renderHeading = roleHeading.map((heading) => (
		<TableHead key={uuid()}>{heading}</TableHead>
	))

	const roleHeadingWithCheckbox = (
		<>
			<TableHead>
				<StyledCheckbox
					// checked={isSelectAll}
					// onChange={selectAllHandler}
					type='checkbox'
				/>
			</TableHead>
			{renderHeading}
		</>
	)

	const renderRoleData =
		roles &&
		roles.map(({ _id, name, vendor, users }) => {
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
				</TableRow>
			)
		})
	return (
		<>
			<Controls title='Role'>
				<IconButton onClick={() => navHandler('add')} src={AddIcon} />
			</Controls>

			<ContentContainer>
				{renderWithLoader(
					roles,
					<Table headings={roleHeadingWithCheckbox}>{renderRoleData}</Table>
				)}
			</ContentContainer>
		</>
	)
}

export default RolePage
