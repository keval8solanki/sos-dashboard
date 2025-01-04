import { AddCircle, Delete } from '@material-ui/icons'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { NavLink, useHistory, useLocation } from 'react-router-dom'
import { useRecoilState, useRecoilValue } from 'recoil'
import { v4 as uuid } from 'uuid'
import { applyJob, deleteJobs, getJobs, jobsEndpoint } from '../../api'
import Controls from '../../components/Controls'
import DeleteModal from '../../components/Modals/DeleteModal'
import Table from '../../components/Table'

import {
	candidateCheckedAtom,
	currentUserAtom,
	jobAtom,
	jobCheckedAtom,
} from '../../recoil/atoms'
import {
	filterTrueCandidateChecked,
	filterTrueJobChecked,
} from '../../recoil/selectors'
import {
	ContentContainer,
	ControlButton,
	StyledCheckbox,
	TableData,
	TableHead,
	TableRow,
} from '../../styles'
import {
	formatDate,
	renderWithLoader,
	titleGenerator,
} from '../../utils/helperFunctions'

import { toast } from '../../components/Toast'
import { get } from 'lodash'
import { SMUIIconButton } from '../../styles/StyledMaterialUI'

function JobPage({ toApply }) {
	// React Hooks
	const history = useHistory()
	const location = useLocation().pathname
	const [jobData, setJobData] = useRecoilState(jobAtom)
	const [checked, setChecked] = useRecoilState(jobCheckedAtom)
	const [, setCandidateChecked] = useRecoilState(candidateCheckedAtom)
	const ids = useRecoilValue(filterTrueJobChecked)
	const candidateSelectedIds = useRecoilValue(filterTrueCandidateChecked)
	const currentUser = useRecoilValue(currentUserAtom)
	const [isModalOpen, setIsModalOpen] = useState(false)

	const toggleModal = () => setIsModalOpen(!isModalOpen)

	useEffect(() => {
		axios
			.get(jobsEndpoint, { withCredentials: true })
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
		try {
			await axios.patch(deleteJobs, { ids }, { withCredentials: true })
			toggleModal()
			setChecked({})
			toast.success('Job Deleted')
		} catch (err) {
			toggleModal()

			toast.error('Something went wrong')
		}
	}

	const candidateApplyHandler = async () => {
		try {
			await axios.post(
				applyJob,
				{
					candidates: candidateSelectedIds,
					jobs: ids,
					userId: currentUser._id,
				},
				{ withCredentials: true }
			)
			setChecked({})
			setCandidateChecked({})
			history.goBack()
			toast.success('Candidates Assigned')
		} catch (err) {
			toast.error('Something went wrong')
		}
	}

	// Renderers
	const renderJobHeading = jobHeading.map((heading) => (
		<TableHead key={uuid()}>{heading}</TableHead>
	))

	console.log({ jobData })
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
							<>
								{get(currentUser, 'roleId.permissions.job.delete') && (
									<SMUIIconButton color='secondary' onClick={toggleModal}>
										<Delete />
									</SMUIIconButton>
								)}
							</>
						)}
					</>
				) : (
					<>
						{get(currentUser, 'roleId.permissions.job.create') && (
							<SMUIIconButton color='primary' onClick={addHandler}>
								<AddCircle />
							</SMUIIconButton>
						)}
					</>
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
