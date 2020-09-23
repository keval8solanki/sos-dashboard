import Axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import styled from 'styled-components'
import { applyJob, getCandidates, getJobs } from '../../api'
import Table from '../../components/Table'
import { candidateAtom, candidateCheckedAtom } from '../../recoil/atoms'
import {
	PageLayout,
	TableData,
	TableHead,
	TableRow,
	IconButton,
} from '../../styles'
import Checkbox from '@material-ui/core/Checkbox'
import Controls from '../../components/Controls'
import { Button } from '@material-ui/core'
import { NavLink, useHistory, useLocation } from 'react-router-dom'
import {
	renderWithLoader,
	titleGenerator,
	trueKeysToArr,
} from '../../utils/helperFunctions'
import { useRecoilValue } from 'recoil'
import { filterTrueCandidateChecked } from '../../recoil/selectors'
import SearchBar from '../../components/SearchBar'
import AddIcon from '../../assets/icons/add.svg'


function CandidatePage() {
	// React Hooks

	const [candidateData, setCandidateData] = useRecoilState(candidateAtom)
	const [checked, setChecked] = useRecoilState(candidateCheckedAtom)
	const ids = useRecoilValue(filterTrueCandidateChecked)

	const history = useHistory()
	const location = useLocation().pathname

	useEffect(() => {
		Axios.get(getCandidates)
			.then(({ data }) => setCandidateData(data))
			.catch((e) => console.log(e))
	}, [checked])

	// Variables
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

	const deleteHandler = () => {}

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

	const toPage = (link) => {
		history.push(link)
	}

	const options = [
		{ value: 'candidateCode', name: 'Candidate Code' },
		{ value: 'name', name: 'Name' },
		{ value: 'primaryEmail', name: 'Email' },
		{ value: 'mobile', name: 'Mobile' },
		{ value: 'city', name: 'City' },
		{ value: 'Industry', name: 'Experience' },
		{ value: 'functionalArea', name: 'Functional Area' },
	]

	return (
		<>
			<Controls title={titleGenerator(ids, 'Candidate Controls')}>
				{ids.length > 0 ? (
					<>
						<Button onClick={deleteHandler} color='secondary'>
							Delete
						</Button>
						<Button onClick={() => toPage('/job/apply')}>Apply</Button>
					</>
				) : (
					<IconButton onClick={() => toPage(`${location}/add`)} src={AddIcon} />
				)}
				{/* <Button variant="contained" color="primary">Import</Button>
				<Button variant="contained" color="primary">Export</Button> */}
			</Controls>

			{renderWithLoader(
				candidateData,
				<Table headings={renderCandidateHeading}>{renderCandidateData}</Table>
			)}
		</>
	)
}

export default CandidatePage

const CandidatePageContainer = styled.div`
	background-color: #0000000d;
	width: 100%;
	padding: 10px;
`
