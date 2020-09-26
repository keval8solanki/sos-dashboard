import 'date-fns'
import DateFnsUtils from '@date-io/date-fns'
import {
	Button,
	IconButton,
	InputLabel,
	MenuItem,
	Select,
	TextField,
} from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Controls from '../../../components/Controls'
import Checkbox from '@material-ui/core/Checkbox'
import {
	KeyboardDatePicker,
	MuiPickersUtilsProvider,
} from '@material-ui/pickers'
import {
	Card,
	CardTitle,
	CategoryTitle,
	ContentContainer,
	ControlButton,
	InputContainer,
	ItemList,
	ItemListContainer,
	MultipleItemInputContainer,
	RemoveSpaces,
	StyledCheckbox,
	StyledTextField,
} from '../../../styles'
import {
	addValToArr,
	codeGenerator,
	jobCodeGenerator,
	renderArr,
} from '../../../utils/helperFunctions'
import Axios from 'axios'
import { companiesEndpoint, createJob, jobEndpoint } from '../../../api'
import {
	SMUIFormControl,
	SMUISelect,
	SMUITextField,
} from '../../../styles/StyledMaterialUI'
import { useRecoilState, useRecoilValue } from 'recoil'
import { companyAtom, currentUserAtom, jobAtom } from '../../../recoil/atoms'
import { NavLink, useHistory, useLocation } from 'react-router-dom'
import { AddCircle } from '@material-ui/icons'
import { get } from 'lodash'

function JobInput({ edit, match }) {
	const history = useHistory()
	const jobId = get(match, 'params.id', '')
	const [companies, setCompanies] = useRecoilState(companyAtom)
	const jobs = useRecoilValue(jobAtom)
	const currentUser = useRecoilValue(currentUserAtom)
	const [job, setJob] = useState(
		jobs && jobs.find((job) => job.jobDetails.jobCode === jobId)
	)
	console.log({ job })
	useEffect(() => {
		if (!job) {
			Axios.get(`${jobEndpoint}/${jobId}`)
				.then(({ data }) => setJob(data))
				.catch((e) => console.log(e))
		}
	}, [])

	const [jobTitle, setJobTitle] = useState(
		get(job, 'jobOpeningInfo.jobTitle', '')
	)
	const [jobType, setJobType] = useState(get(job, 'jobOpeningInfo.jobType', ''))
	const [industry, setIndustry] = useState(
		get(job, 'jobOpeningInfo.industry', '')
	)
	const [noOfOpening, setNoOfOpening] = useState(
		get(job, 'jobOpeningInfo.noOfOpenings')
	)

	//companydetails
	const [companyId, setCompanyId] = useState(
		get(job, 'companyDetails.companyId', '')
	)

	const [isCompanyDetailsVisible, setIsCompanyDetailsVisible] = useState(
		get(job, 'companyDetails.isCompanyDetailsVisible', true)
	)
	//jobaddress
	const [jobLocation, setJobLocation] = useState(
		get(job, 'jobAddress.jobLocation')
	)
	const [city, setCity] = useState(get(job, 'jobAddress.city', ''))
	const [zone, setZone] = useState(get(job, 'jobAddress.zone'))
	const [state, setState] = useState(get(job, 'jobAddress.state', ''))
	const [pincode, setPincode] = useState(get(job, 'jobAddress.pincode'))
	const [country, setCountry] = useState(get(job, 'jobAddress.country', ''))

	//jobdetails
	const [jobDescription, setJobDescription] = useState(
		get(job, 'jobDetails.jobDescription', '')
	)

	const [eligibility, setEligibility] = useState(
		get(job, 'jobDetails.eligibility', [])
	)
	const [eligibilityVal, setEligibilityVal] = useState()

	const [responsibilities, setResponsibilities] = useState(
		get(job, 'jobDetails.responsibilities', [])
	)
	const [responsibilitiesVal, setResponsibilitiesVal] = useState()

	const [benefits, setBenefits] = useState(get(job, 'jobDetails.benefits', []))
	const [benefitsVal, setBenefitsVal] = useState()

	const [additionalInformation, setAdditionalInformation] = useState(
		get(job, 'jobDetails.additionalInformation', '')
	)
	const [targetDate, setTargetDate] = useState(
		get(job, 'jobDetails.targetDate')
	)

	useEffect(() => {
		Axios.get(companiesEndpoint)
			.then(({ data }) => setCompanies(data))
			.catch((e) => console.log(e))
	}, [])

	//functions
	const resetFields = () => {}

	//handlers
	const saveHandler = async (isEdit) => {
		const newJobData = {
			jobOpeningInfo: {
				jobTitle,
				jobType,
				industry,
				assignedOn: new Date(),
				noOfOpenings: Number(noOfOpening),
			},
			companyDetails: {
				companyId,
				isCompanyDetailsVisible,
			},
			jobAddress: {
				jobLocation,
				city,
				zone,
				state,
				pincode,
				country,
			},
			jobDetails: {
				jobCode: codeGenerator(jobTitle, industry, companyId),
				jobDescription,
				additionalInformation,
				targetDate,
				eligibility,
				responsibilities,
				benefits,
			},
			source: currentUser._id,
		}
		console.log('Saving..')
		console.log(newJobData)
		try {
			if (isEdit) {
				const { data } = await Axios.patch(
					`${jobEndpoint}/${jobId}`,
					newJobData
				)
			} else {
				const { data } = await Axios.post(jobEndpoint, newJobData)
			}
		} catch (err) {
			alert(err)
		}
		console.log(newJobData)
	}

	const renderCompaniesOption =
		companies &&
		companies.map(({ _id, companyName }) => {
			return (
				<MenuItem key={_id} value={_id}>
					{companyName}
				</MenuItem>
			)
		})

	const addCompanyHandler = () => {
		history.push('/company/add')
	}

	return (
		<JobInputContainer>
			{/* Control */}
			<Controls title='Job Control'>
				<ControlButton color='secondary'>Reset</ControlButton>
				<ControlButton
					variant='contained'
					color='primary'
					onClick={() => saveHandler(edit)}>
					Save
				</ControlButton>
			</Controls>
			<ContentContainer>
				<Card>
					<CardTitle>Job Opening Info</CardTitle>
					<SMUITextField
						variant='outlined'
						value={jobTitle}
						onChange={(e) => setJobTitle(e.target.value)}
						label='Job Title'
					/>
					<SMUITextField
						variant='outlined'
						value={industry}
						onChange={(e) => setIndustry(e.target.value)}
						label='Industry'
					/>
					<SMUITextField
						variant='outlined'
						value={noOfOpening}
						onChange={(e) => setNoOfOpening(e.target.value)}
						type='number'
						label='No. of Opening'
					/>
					<SMUIFormControl>
						<InputLabel id='jobtype'>Job type</InputLabel>
						<SMUISelect
							// variant='outlined'
							labelId='jobtype'
							value={jobType}
							onChange={(e) => setJobType(e.target.value)}>
							<MenuItem value='Full-time'>Full-Time</MenuItem>
							<MenuItem value='Part-time'>Part-time</MenuItem>
							<MenuItem value='Freelancing'>Part-time</MenuItem>
						</SMUISelect>
					</SMUIFormControl>
					<SMUIFormControl>
						<InputLabel id='company'>Company</InputLabel>
						<SMUISelect
							labelId='company'
							value={companyId}
							onChange={(e) => setCompanyId(e.target.value)}>
							{renderCompaniesOption}

							<MenuItem value='add New' onClick={addCompanyHandler}>
								+ Add New Company
							</MenuItem>
						</SMUISelect>
					</SMUIFormControl>
					<CheckBoxContainer>
						<StyledCheckbox
							checked={isCompanyDetailsVisible}
							onChange={(e) => setIsCompanyDetailsVisible(e.target.checked)}
							type='checkbox'
						/>
						<CheckBoxLabel>Company Details Visible</CheckBoxLabel>
					</CheckBoxContainer>
				</Card>

				<Card>
					<CardTitle>Job Address</CardTitle>

					<SMUITextField
						value={city}
						onChange={(e) => setCity(e.target.value)}
						label='City'
					/>

					<SMUITextField
						value={state}
						onChange={(e) => setState(e.target.value)}
						label='State'
					/>
					<SMUITextField
						value={pincode}
						onChange={(e) => setPincode(e.target.value)}
						label='Pincode'
					/>
					<SMUITextField
						value={country}
						onChange={(e) => setCountry(e.target.value)}
						label='Country'
					/>
					<SMUIFormControl>
						<InputLabel id='jobLocation'>Job Location</InputLabel>
						<SMUISelect
							value={jobLocation}
							onChange={(e) => setJobLocation(e.target.value)}
							labelId='jobLocation'>
							<MenuItem value='On Location'>On Location</MenuItem>
							<MenuItem value='Remote'>Remote</MenuItem>
						</SMUISelect>
					</SMUIFormControl>

					<SMUIFormControl>
						<InputLabel id='zone'>Zone</InputLabel>

						<SMUISelect
							value={zone}
							onChange={(e) => setZone(e.target.value)}
							labelId='zone'>
							<MenuItem value='North'>North</MenuItem>
							<MenuItem value='East'>East</MenuItem>
							<MenuItem value='West'>West</MenuItem>
							<MenuItem value='South'>South</MenuItem>
							<MenuItem value='North-East'>North-East</MenuItem>
							<MenuItem value='North-West'>North-West</MenuItem>
							<MenuItem value='South-East'>South-East</MenuItem>
							<MenuItem value='South-West'>South-West</MenuItem>
						</SMUISelect>
					</SMUIFormControl>
				</Card>
				<Card>
					<CardTitle>Job Details</CardTitle>

					{eligibility.length > 0 && (
						<ItemListContainer>
							{renderArr(eligibility, setEligibility)}
						</ItemListContainer>
					)}

					<MultipleItemInputContainer
						onSubmit={(e) =>
							addValToArr(e, eligibilityVal, eligibility, setEligibility)
						}>
						<SMUITextField
							value={eligibilityVal}
							onChange={(e) => setEligibilityVal(e.target.value)}
							label='Eligibility'
						/>
						<IconButton type='submit' variant='contained' color='primary'>
							<AddCircle />
						</IconButton>
					</MultipleItemInputContainer>

					{responsibilities.length > 0 && (
						<ItemListContainer>
							{renderArr(responsibilities, setResponsibilities)}
						</ItemListContainer>
					)}
					<MultipleItemInputContainer
						onSubmit={(e) =>
							addValToArr(
								e,
								responsibilitiesVal,
								responsibilities,
								setResponsibilities
							)
						}>
						<SMUITextField
							label='Responsibilities'
							value={responsibilitiesVal}
							onChange={(e) => setResponsibilitiesVal(e.target.value)}
						/>
						<IconButton type='submit' variant='contained' color='primary'>
							<AddCircle />
						</IconButton>
					</MultipleItemInputContainer>

					{benefits.length > 0 && (
						<ItemListContainer>
							{renderArr(benefits, setBenefits)}
						</ItemListContainer>
					)}
					<MultipleItemInputContainer
						onSubmit={(e) =>
							addValToArr(e, benefitsVal, benefits, setBenefits)
						}>
						<SMUITextField
							label='Benefits'
							value={benefitsVal}
							onChange={(e) => setBenefitsVal(e.target.value)}
						/>
						<IconButton type='submit' variant='contained' color='primary'>
							<AddCircle />
						</IconButton>
					</MultipleItemInputContainer>

					<SMUITextField
						variant='outlined'
						multiline
						rows={4}
						rowsMax={4}
						value={jobDescription}
						onChange={(e) => setJobDescription(e.target.value)}
						label='Job Description'
					/>

					<SMUITextField
						variant='outlined'
						multiline
						rows={4}
						rowsMax={4}
						value={additionalInformation}
						onChange={(e) => setAdditionalInformation(e.target.value)}
						label='Additional Information'
					/>

					<SMUIFormControl>
						<SMUITextField
							value={targetDate}
							onChange={(e) => setTargetDate(e.target.value)}
							type='date'
							placeholder='Target Date'
						/>
					</SMUIFormControl>
				</Card>
			</ContentContainer>

			{/* inputs */}
		</JobInputContainer>
	)
}

export default JobInput

const JobInputContainer = styled.div``

const CheckBoxContainer = styled.div`
	display: flex;
	justify-content: flex-start;
	align-items: center;
`
const CheckBoxLabel = styled.p`
	${RemoveSpaces}
	padding-left: 5px;
	font-size: 0.8em;
	font-weight: 400;
`
