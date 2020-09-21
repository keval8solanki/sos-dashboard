import Axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import styled from 'styled-components'
import {
	applyJob,
	deleteJob,
	deleteJobs,
	deleteManyJobs,
	getJobs,
} from '../../api'
import Table from '../../components/Table'
import {
	candidateCheckedAtom,
	jobAtom,
	jobCheckedAtom,
} from '../../recoil/atoms'
import {
	ContentContainer,
	PageLayout,
	StyledButton,
	TableData,
	TableHead,
	TableRow,
} from '../../styles'
import TableComponent from '../../components/TableComponent'
import Checkbox from '@material-ui/core/Checkbox'
import { NavLink, useHistory, useLocation } from 'react-router-dom'
import { v4 as uuid } from 'uuid'
import Controls from '../../components/Controls'
import { Button } from '@material-ui/core'
import { titleGenerator, renderWithLoader } from '../../utils/helperFunctions'
import {
	filterTrueCandidateChecked,
	filterTrueJobChecked,
} from '../../recoil/selectors'
import SearchBar from '../../components/SearchBar'
import AddIcon from '../../assets/icons/add.svg'

function JobPage({ toApply }) {
	// React Hooks
	const history = useHistory()
	const location = useLocation().pathname
	const [jobData, setJobData] = useRecoilState(jobAtom)
	console.log(jobData)
	const [checked, setChecked] = useRecoilState(jobCheckedAtom)
	const ids = useRecoilValue(filterTrueJobChecked)
	const candidateSelectedIds = useRecoilValue(filterTrueCandidateChecked)

	useEffect(() => {
		Axios.get(getJobs)
			.then(({ data }) => {
				setJobData(data)
			})
			.catch((e) => console.log(e))
	}, [checked])

	// Variables
	const jobHeading = [
		// 'Select',
		'Job Code',
		'Job Title',
		'Company',
		'City',
		'Openings',
		`Resumes`,
		`Posted On`,
		`Assigned On`,
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
				userId: '5f647ab5a39e2d43e85044a0',
			})
		} catch (err) {
			console.log(err)
		}
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
						<Checkbox
							value={checked[job._id]}
							color='primary'
							onChange={() => onCheckHandler(job._id)}
						/>
					</TableData>

					<TableData>
						<NavLink to={`${location}/${job.jobDetails.jobCode}`}>
							{job.jobDetails.jobCode}
						</NavLink>
					</TableData>
					<TableData>{job.jobOpeningInfo.jobTitle}</TableData>
					<TableData>{job.companyDetails.companyName}</TableData>
					<TableData>{job.jobAddress.city}</TableData>
					<TableData>{job.jobOpeningInfo.noOfOpenings}</TableData>
					<TableData>45</TableData>
					<TableData>{new Date(job.createdAt).toDateString()}</TableData>
					<TableData>
						{new Date(job.jobOpeningInfo.assignedOn).toDateString()}
					</TableData>
				</TableRow>
			)
		})

	const addHandler = () => {
		history.push(`${location}/add`)
	}

	const options = [
		{ value: 'jobCode', name: 'Job Code' },
		{ value: 'jobTitle', name: 'Job Title' },
		{ value: 'company', name: 'company' },
		{ value: 'city', name: 'City' },
		{ value: 'noOfOpening', name: 'Openings' },
		{ value: 'noOfResume', name: 'Resume' },
	]
	return (
		<>
			<Controls title={titleGenerator(ids, 'Jobs')}>
				{ids.length > 0 ? (
					<>
						<Button onClick={deleteHandler} color='secondary'>
							Delete
						</Button>

						<Button onClick={candidateApplyHandler} color='secondary'>
							Apply
						</Button>
					</>
				) : (
					// <Button onClick={addHandler} variant='contained' color='primary'>
					// 	Add
					// </Button>

					<AddButton onClick={addHandler} src={AddIcon} />
				)}
			</Controls>
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
const AddButton = styled.img`
	width: 28px;
	cursor: pointer;
`
