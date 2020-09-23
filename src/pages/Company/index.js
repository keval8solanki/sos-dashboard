import React, { useEffect, useState } from 'react'
import {
	ContentContainer,
	StyledCheckbox,
	TableHead,
	TableData,
	TableRow,
	RemoveSpaces,
} from '../../styles'
import Controls from '../../components/Controls'
import { Button, IconButton } from '@material-ui/core'
import { useHistory, useLocation } from 'react-router-dom'
import { useRecoilState, useRecoilValue } from 'recoil'
import { companyAtom, companyCheckedAtom } from '../../recoil/atoms'
import Axios from 'axios'
import { companiesEndpoint } from '../../api'
import { v4 as uuid } from 'uuid'
import Table from '../../components/Table'
import { renderWithLoader, trueKeysToArr } from '../../utils/helperFunctions'
import { selectedCompanies } from '../../recoil/selectors'
import DeleteIcon from '@material-ui/icons/Delete'
import AddCircleIcon from '@material-ui/icons/AddCircle'
import Modal from '@material-ui/core/Modal'
import styled from 'styled-components'

function CompanyPage() {
	const history = useHistory()
	const location = useLocation().pathname
	const [companies, setCompanies] = useRecoilState(companyAtom)
	const [checked, setChecked] = useRecoilState(companyCheckedAtom)
	const [isModalOpen, setIsModalOpen] = useState(false)
	const [isSelectAll, setIsSelectAll] = useState(false)

	const selectedCompany = useRecoilValue(selectedCompanies)

	console.log(selectedCompany)
	console.log(companies)
	useEffect(() => {
		Axios.get(companiesEndpoint)
			.then(({ data }) => setCompanies(data))
			.catch((e) => console.log(e))
	}, [isModalOpen])

	const navHandler = (to) => {
		history.push(`${location}/${to}`)
	}

	const selectAllHandler = () => {}

	const companyHeading = ['Company Name', 'Company Address']

	const renderCompanyHeading = companyHeading.map((heading) => (
		<TableHead key={uuid()}>{heading}</TableHead>
	))

	const companyHeadingWithCheckbox = (
		<>
			<TableHead>
				<StyledCheckbox
					checked={isSelectAll}
					onChange={selectAllHandler}
					type='checkbox'
				/>
			</TableHead>
			{renderCompanyHeading}
		</>
	)

	const checkHandler = (e, _id) => {
		setChecked({ ...checked, [_id]: e.target.checked })
	}

	const deleteManyHandler = async () => {
		try {
			// console.log(selectedCompany)
			await Axios.patch(companiesEndpoint, selectedCompany)
			toggleModal()
			setChecked({})
		} catch (error) {
			alert(error)
		}
	}

	const toggleModal = () => setIsModalOpen(!isModalOpen)

	const renderCompanyData =
		companies &&
		companies.map(({ _id, companyName, companyAddress }) => {
			return (
				<TableRow key={_id}>
					<TableData>
						<StyledCheckbox
							onChange={(e) => checkHandler(e, _id)}
							checked={checked[_id] || false}
							type='checkbox'
						/>
					</TableData>

					<TableData>{companyName}</TableData>
					<TableData>{companyAddress}</TableData>
				</TableRow>
			)
		})

	return (
		<>
			<Controls title='Company'>
				{selectedCompany.length > 0 ? (
					<IconButton color='secondary' onClick={toggleModal}>
						<DeleteIcon />
					</IconButton>
				) : (
					<IconButton color='primary' onClick={() => navHandler('add')}>
						<AddCircleIcon />
					</IconButton>
				)}
			</Controls>
			<StyledModal open={isModalOpen} onClose={toggleModal}>
				<ModalBody>
					<ModalTitle>{selectedCompany.length} Items Selected</ModalTitle>
					<ModalWarning>Warning: This action cannot be undone</ModalWarning>
					<ModalText>Do you want to delete?</ModalText>
					<ModalButtonContainer>
						<StyledButton onClick={toggleModal}>Cancel</StyledButton>
						<StyledButton
							onClick={deleteManyHandler}
							color='secondary'
							variant='contained'>
							Delete
						</StyledButton>
					</ModalButtonContainer>
				</ModalBody>
			</StyledModal>
			<ContentContainer>
				{renderWithLoader(
					companies,
					<Table headings={companyHeadingWithCheckbox}>
						{renderCompanyData}
					</Table>
				)}
			</ContentContainer>
		</>
	)
}

export default CompanyPage

const StyledModal = styled(Modal)`
	&& {
		position: fixed;
		top: 60px;
		left: auto;
		margin: 0 auto;
		right: auto;
		width: 500px;
		outline: none;
		border-style: none;
	}
	&&:focus {
		outline: none;
	}
`

const StyledButton = styled(Button)`
	&& {
		margin: 10px;
		padding: 5px 20px;
	}
`

const ModalBody = styled.div`
	background-color: white;
	padding: 20px;
	border-radius: 5px;
`
const ModalTitle = styled.h4`
	${RemoveSpaces};
	padding-bottom: 10px;
`

const ModalWarning = styled.p`
	${RemoveSpaces}
	padding: 10px;
	font-weight: bold;
	border: 2px solid red;
	border-radius: 5px;
	border-left: 10px solid red;
`

const ModalText = styled.p`
	${RemoveSpaces};
	padding-top: 10px;
`

const ModalButtonContainer = styled.div`
	display: flex;
	justify-content: flex-end;
	margin-top: 20px;
`
