import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

import { jobAtom, jobTab } from '../../recoil/atoms'
import PageTab from '../../components/PageTab'
import { PageLayout, TableHead, TableRow, TableData } from '../../styles'
import { useRecoilValue } from 'recoil'
import Axios from 'axios'
import { deleteJob, getJob } from '../../api'
import JobInfo from './components/JobInfo'
import { Button, Checkbox } from '@material-ui/core'
import { NavLink, useLocation } from 'react-router-dom'
import Table from '../../components/Table'
import Controls from '../../components/Controls'

function JobDetails({ match }) {
	const location = useLocation().pathname
	const id = match.params.id
	const jobTabIndex = useRecoilValue(jobTab)
	const labels = ['Applied Candidates', 'Job Details']
	const [checked, setChecked] = useState([])
	const [job, setJob] = useState()
	const jobFullData = useRecoilValue(jobAtom)
	const selectedJob = jobFullData
		? jobFullData.find((job) => job.jobDetails.jobCode === id)
		: job
	console.log(selectedJob)
	const candidateData = selectedJob.statusIds.map((item) => item.candidateId)

	useEffect(() => {
		Axios.get(`${getJob}/${id}`)
			.then(({ data }) => setJob(data))
			.catch((e) => console.log(e))
	}, [])
	const onCheckHandler = (id) => {
		const newData = {
			...checked,
			[id]: !checked[id],
		}
		setChecked(newData)
	}

	const deleteHandler = async () => {
		try {
			const deleted = Axios.delete(`${deleteJob}/${id}`)
			alert('Deleted')
		} catch (err) {
			alert(err)
		}
	}

	const candidateHeading = [
		'Select',
		'Candidate Code',
		'Name',
		'Email',
		'Mobile',
		'City',
		`Experience`,
		`Industry`,
		`Functional Area`,
	]

	const renderCandidateHeading = candidateHeading.map((heading) => (
		<TableHead>{heading}</TableHead>
	))

	const renderCandidateData =
		candidateData &&
		candidateData.map((candidate) => {
			return (
				<TableRow key={candidate._id}>
					<TableData>
						<Checkbox
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
					<TableData>45</TableData>
					<TableData>{candidate.professional.industry}</TableData>
					<TableData>{candidate.professional.functionalArea}</TableData>
				</TableRow>
			)
		})

	const renderTabBody = (index) => {
		switch (index) {
			case 0:
				return (
					<>
						{candidateData && (
							<Table headings={renderCandidateHeading}>
								{renderCandidateData}
							</Table>
						)}
					</>
				)

			case 1:
				return <JobInfo job={selectedJob} />

			default:
				break
		}
	}

	return (
		<PageLayout>
			<Controls title={selectedJob.jobOpeningInfo.jobTitle}>
				<Button onClick={deleteHandler} color='secondary'>
					Delete
				</Button>
				<Button variant='contained' color='primary'>
					Edit
				</Button>
			</Controls>

			<PageTab atom={jobTab} labels={labels} />
			{renderTabBody(jobTabIndex)}
		</PageLayout>
	)
}

export default JobDetails

const JobDetailsContainer = styled.div``
