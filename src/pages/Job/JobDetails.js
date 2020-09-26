import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

import { jobAtom, jobTab } from '../../recoil/atoms'
import PageTab from '../../components/PageTab'
import {
	PageLayout,
	TableHead,
	TableRow,
	TableData,
	ContentContainer,
	ControlButton,
	Card,
	themeBorder,
	RemoveSpaces,
} from '../../styles'
import { useRecoilValue } from 'recoil'
import Axios from 'axios'
import { deleteJob, getJob, jobEndpoint } from '../../api'
import JobInfo from './components/JobInfo'
import { Button, Checkbox } from '@material-ui/core'
import { NavLink, useHistory, useLocation } from 'react-router-dom'
import Table from '../../components/Table'
import Controls from '../../components/Controls'
import DeleteModal from '../../components/Modals/DeleteModal'
import { counter, renderWithLoader } from '../../utils/helperFunctions'
import { get } from 'lodash'
import ArrowBG from '../../assets/icons/arrow.svg'

function JobDetails({ match }) {
	const history = useHistory()
	const location = useLocation().pathname
	const id = match.params.id
	const jobTabIndex = useRecoilValue(jobTab)
	const labels = ['PipeLine', 'Applied Candidates', 'Job Details']
	const [checked, setChecked] = useState([])
	const [job, setJob] = useState()
	const jobFullData = useRecoilValue(jobAtom)
	const selectedJob = jobFullData
		? jobFullData.find((job) => job.jobDetails.jobCode === id)
		: job

	console.log({ selectedJob })

	const stageDataCount = counter(
		get(selectedJob, 'statusIds', []).map(
			(statusId) => statusId.currentStage.stageName
		)
	)

	console.log(stageDataCount)

	const stages = [
		'Shortlisted',
		'Assessment',
		'Hiring manager review',
		'Interview 1',
		'Interview 2',
		'Interview 3',
		'Salary Fitment',
		'Offer',
		'Documentation',
		'Joining',
	]

	const renderPipeline = stages.map((stage) => {
		return (
			<PipelineCard>
				<PipelineStat>{get(stageDataCount, stage, 0)}</PipelineStat>
				<PipelineTitle>{stage}</PipelineTitle>
			</PipelineCard>
		)
	})

	const [isModalOpen, setIsModalOpen] = useState(false)
	const toggleModal = () => setIsModalOpen(!isModalOpen)
	useEffect(() => {
		console.log('Use Effect Running...')
		Axios.get(`${jobEndpoint}/${id}`)
			.then(({ data }) => {
				setJob(data)
			})
			.catch((e) => console.log(e))
	}, [])
	const candidateData = get(selectedJob, 'statusIds', []).map(
		(item) => item.candidateId
	)
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
			toggleModal()
		} catch (err) {
			alert(err)
		}
	}

	const editNavHandler = () => {
		history.push(`/job/edit/${id}`)
	}

	const candidateHeading = [
		'Candidate Code',
		'Name',
		'Email',
		'Mobile',
		'City',
		`Experience`,
		`Industry`,
		`Functional Area`,
		'Status',
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
						<NavLink to={`/applied/${candidate.candidateCode}`}>
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
				return <PipelineContainer>{renderPipeline}</PipelineContainer>
			case 1:
				return (
					<>
						{renderWithLoader(
							candidateData,
							<Table headings={renderCandidateHeading}>
								{renderCandidateData}
							</Table>
						)}
					</>
				)

			case 2:
				return <JobInfo job={selectedJob} />

			default:
				break
		}
	}

	return (
		<>
			<Controls
				title={get(selectedJob, 'jobOpeningInfo.jobTitle', 'Loading..')}>
				{/* <Controls title='Details'> */}
				<ControlButton onClick={toggleModal} color='secondary'>
					Delete
				</ControlButton>
				<ControlButton
					onClick={editNavHandler}
					variant='contained'
					color='primary'>
					Edit
				</ControlButton>
			</Controls>

			<ContentContainer>
				<DeleteModal
					open={isModalOpen}
					onClose={toggleModal}
					count={1}
					deleteHandler={deleteHandler}
				/>
				<PageTab atom={jobTab} labels={labels} />
				{renderTabBody(jobTabIndex)}
			</ContentContainer>
		</>
	)
}

export default JobDetails

const JobDetailsContainer = styled.div``

const PipelineContainer = styled(Card)`
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	row-gap: 1em;
	padding: 50px;
`
const PipelineCard = styled.div`
	display: flex;
	padding: 20px;
	align-items: center;
	justify-content: center;
	background-color: #4caf5029;
	margin: 0px;
	height: 50px;
	transition: all 0.3s;
	clip-path: polygon(90% 0, 100% 50%, 90% 100%, 0% 100%, 10% 50%, 0% 0%);

	&:hover {
		background-color: #ffc10726;
		transform: translateX(10px);
	}
	/* background-image: url(${ArrowBG}); */
	/* background-repeat: no-repeat; */
`
const PipelineTitle = styled.p`
	${RemoveSpaces};
	color: #333;
	font-weight: lighter;
	font-size: 1.25em;
`

const PipelineStat = styled.p`
	${RemoveSpaces};
	padding-right: 10px;

	font-size: 2em;
	font-weight: bold;
	color: #333;
`
