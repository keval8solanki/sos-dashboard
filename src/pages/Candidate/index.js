import Axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import styled from 'styled-components'
import {
	applyJob,
	candidatesEndpoint,
	companiesEndpoint,
	getCandidates,
	getJobs,
} from '../../api'
import Table from '../../components/Table'
import { candidateAtom, candidateCheckedAtom } from '../../recoil/atoms'
import {
	PageLayout,
	TableData,
	TableHead,
	TableRow,
	
	StyledCheckbox,
	ContentContainer,
	ControlButton,
} from '../../styles'
import Checkbox from '@material-ui/core/Checkbox'
import Controls from '../../components/Controls'
import { IconButton } from '@material-ui/core'
import { NavLink, useHistory, useLocation } from 'react-router-dom'
import {
	formatDate,
	renderWithLoader,
	titleGenerator,
	trueKeysToArr,
} from '../../utils/helperFunctions'
import { useRecoilValue } from 'recoil'
import { filterTrueCandidateChecked } from '../../recoil/selectors'
import SearchBar from '../../components/SearchBar'
import AddIcon from '../../assets/icons/add.svg'
import DeleteModal from '../../components/Modals/DeleteModal'
import { AddCircle, Delete } from '@material-ui/icons'

function CandidatePage() {
	// React Hooks

	const [candidateData, setCandidateData] = useRecoilState(candidateAtom)
	const [checked, setChecked] = useRecoilState(candidateCheckedAtom)
	const selected = useRecoilValue(filterTrueCandidateChecked)

	const [isModalOpen, setIsModalOpen] = useState(false)
	const toggleModal = () => setIsModalOpen(!isModalOpen)

	const history = useHistory()
	const location = useLocation().pathname

	useEffect(() => {
		Axios.get(getCandidates)
			.then(({ data }) => setCandidateData(data))
			.catch((e) => console.log(e))
	}, [checked, isModalOpen])

	// Variables
	const candidateHeading = [
		'Select',
		'Candidate Code',
		'Name',
		'Email',
		'Mobile',
		'City',
		// `Experience`,
		`Industry`,
		`Functional Area`,
		`Entered On`,
	]

	// Helper Functions
	const onCheckHandler = (id) => {
		const newData = {
			...checked,
			[id]: !checked[id],
		}
		setChecked(newData)
	}

	const renderCandidateHeading = candidateHeading.map((heading) => (
		<TableHead>{heading}</TableHead>
	))

	const deleteHandler = async () => {
		try {
			await Axios.patch(candidatesEndpoint, selected)
			toggleModal()
			setChecked({})
		} catch (error) {
			alert(error)
		}
	}

	// const applyHandler = async () => {
	// 	try {
	// 		await Axios.post(applyJob, {
	// 			candidates: ids,
	// 			jobs,
	// 			userId: '5f647ab5a39e2d43e85044a0',
	// 		})
	// 	} catch (err) {
	// 		console.log(err)
	// 	}
	// }

	// Renderers
	const renderCandidateData =
		candidateData &&
		candidateData.map((candidate) => {
			return (
				<TableRow key={candidate._id}>
					<TableData>
						<StyledCheckbox
							type='checkbox'
							checked={checked[candidate._id]}
							color='primary'
							onChange={() => onCheckHandler(candidate._id)}
						/>
					</TableData>
					<TableData>
						<NavLink to={`${location}/${candidate.candidateCode}`}>
							{candidate.candidateCode}
						</NavLink>{' '}
					</TableData>
					<TableData>{candidate.basic.fullName}</TableData>
					<TableData>{candidate.basic.primaryEmail}</TableData>
					<TableData>{candidate.basic.mobile}</TableData>
					<TableData>{candidate.address.state}</TableData>
					{/* <TableData>45</TableData> */}
					<TableData>{candidate.professional.industry}</TableData>
					<TableData>{candidate.professional.functionalArea}</TableData>
					<TableData>{formatDate(candidate.createdAt)}</TableData>
				</TableRow>
			)
		})

	const toPage = (link) => {
		history.push(link)
	}

	return (
		<>
			<Controls title={titleGenerator(selected, 'Candidate Controls')}>
				{selected.length > 0 ? (
					<>
						<IconButton onClick={toggleModal} color='secondary'>
							<Delete/>
						</IconButton>
						<ControlButton
							variant='contained'
							color='primary'
							onClick={() => toPage('/job/apply')}>
							Assign
						</ControlButton>
					</>
				) : (
						<IconButton onClick={() => toPage(`${location}/add`)} >
							<AddCircle/>
					</IconButton>
				)}
				{/* <Button variant="contained" color="primary">Import</Button>
				<Button variant="contained" color="primary">Export</Button> */}
			</Controls>
			<DeleteModal
				open={isModalOpen}
				onClose={toggleModal}
				count={selected.length}
				deleteHandler={deleteHandler}
			/>
			<ContentContainer>
				{renderWithLoader(
					candidateData,
					<Table headings={renderCandidateHeading}>{renderCandidateData}</Table>
				)}
			</ContentContainer>
		</>
	)
}

export default CandidatePage

const CandidatePageContainer = styled.div`
	background-color: #0000000d;
	width: 100%;
	padding: 10px;
`
