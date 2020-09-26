import Axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import styled from 'styled-components'
import { applyJob, deleteJobs, getJobs } from '../../api'
import Table from '../../components/Table'
import {
	candidateCheckedAtom,
	currentUserAtom,
	jobAtom,
	jobCheckedAtom,
} from '../../recoil/atoms'
import {
	ContentContainer,
	TableData,
	TableHead,
	TableRow,
	StyledCheckbox,
	ControlButton,
} from '../../styles'
import { NavLink, useHistory, useLocation } from 'react-router-dom'
import { v4 as uuid } from 'uuid'
import Controls from '../../components/Controls'
import {
	titleGenerator,
	renderWithLoader,
	formatDate,
} from '../../utils/helperFunctions'
import {
	filterTrueCandidateChecked,
	filterTrueJobChecked,
} from '../../recoil/selectors'
import AddIcon from '../../assets/icons/add.svg'
import DeleteModal from '../../components/Modals/DeleteModal'
import { IconButton } from '@material-ui/core'
import { AddCircle, Delete } from '@material-ui/icons'

function JobPage({ toApply }) {
	// React Hooks
	const history = useHistory()
	const location = useLocation().pathname
	const [jobData, setJobData] = useRecoilState(jobAtom)
	console.log({ jobData })
	const [checked, setChecked] = useRecoilState(jobCheckedAtom)
	const [candidateChecked, setCandidateChecked] = useRecoilState(
		candidateCheckedAtom
	)
	const ids = useRecoilValue(filterTrueJobChecked)
	const candidateSelectedIds = useRecoilValue(filterTrueCandidateChecked)
	const currentUser = useRecoilValue(currentUserAtom)

	const [isModalOpen, setIsModalOpen] = useState(false)

	const toggleModal = () => setIsModalOpen(!isModalOpen)

	useEffect(() => {
		Axios.get(getJobs)
			.then(({ data }) => {
				setJobData(data)
			})
			.catch((e) => console.log(e))
	}, [checked, isModalOpen])

	// Variables

	const jobHeading = [
		'Select',
		'Job Code',
		'Job Title',
		'Company',
		'City',
		'Openings',
		`Resumes`,
		`Posted On`,
		// `Assigned On`,
	]

	// Helper Functions
	const onCheckHandler = (id) => {
		const newData = {
			...checked,
			[id]: !checked[id],
		}
		setChecked(newData)
	}

	const deleteHandler = async () => {
		console.log('Delete Many Clicked')

		try {
			await Axios.patch(deleteJobs, { ids })
			toggleModal()
			setChecked({})
		} catch (err) {
			console.log(err)
			alert(err)
		}
	}

	const candidateApplyHandler = async () => {
		console.log(ids)
		console.log(candidateSelectedIds)
		try {
			await Axios.post(applyJob, {
				candidates: candidateSelectedIds,
				jobs: ids,
				userId: currentUser._id,
			})
			setChecked({})
			setCandidateChecked({})

			history.push('/candidate')
		} catch (err) {
			console.log(err)
		}
	}

	const assignJobHandler = () => {
		history.push('/candidate')
	}

	// Renderers
	const renderJobHeading = jobHeading.map((heading) => (
		<TableHead key={uuid()}>{heading}</TableHead>
	))

	const renderJobData =
		jobData &&
		jobData.map((job) => {
			return (
				<TableRow
					style={{
						backgroundColor: checked[job._id] ? '#0c68fa1f' : 'white',
					}}
					key={job._id}>
					<TableData>
						<StyledCheckbox
							type='checkbox'
							checked={checked[job._id]}
							color='primary'
							onChange={() => onCheckHandler(job._id)}
						/>
					</TableData>

					<TableData>
						{toApply ? (
							job.jobDetails.jobCode
						) : (
							<NavLink to={`${location}/${job.jobDetails.jobCode}`}>
								{job.jobDetails.jobCode}
							</NavLink>
						)}
					</TableData>
					<TableData>{job.jobOpeningInfo.jobTitle}</TableData>
					<TableData>{job.companyDetails.companyId.companyName}</TableData>
					<TableData>{job.jobAddress.city}</TableData>
					<TableData>{job.jobOpeningInfo.noOfOpenings}</TableData>
					<TableData>{job.statusIds.length}</TableData>
					<TableData>{formatDate(job.createdAt)}</TableData>
					{/* <TableData>
						{new Date(job.jobOpeningInfo.assignedOn).toDateString()}
					</TableData> */}
				</TableRow>
			)
		})

	const addHandler = () => {
		history.push(`${location}/add`)
	}

	return (
		<>
			<Controls title={titleGenerator(ids, 'Jobs')}>
				{ids.length > 0 ? (
					<>
						{toApply ? (
							<ControlButton
								onClick={candidateApplyHandler}
								variant='contained'
								color='primary'>
								Apply
							</ControlButton>
						) : (
							<IconButton onClick={toggleModal}>
								<Delete />
							</IconButton>
						)}
					</>
				) : (
					<IconButton onClick={addHandler}>
						<AddCircle />
					</IconButton>
				)}
			</Controls>

			<DeleteModal
				open={isModalOpen}
				onClose={toggleModal}
				count={ids.length}
				deleteHandler={deleteHandler}
			/>

			<ContentContainer>
				{renderWithLoader(
					jobData,
					<Table headings={renderJobHeading}>{renderJobData}</Table>
				)}
			</ContentContainer>
		</>
	)
}

export default JobPage

const JobPageContainer = styled.div`
	background-color: #0000000d;
	width: 100%;
	padding: 10px;
`
