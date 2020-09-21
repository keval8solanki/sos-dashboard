import 'date-fns'
import DateFnsUtils from '@date-io/date-fns'
import {
	Button,
	InputLabel,
	MenuItem,
	Select,
	TextField,
} from '@material-ui/core'
import React, { useState } from 'react'
import styled from 'styled-components'
import Controls from '../../../components/Controls'
import Checkbox from '@material-ui/core/Checkbox'
import {
	KeyboardDatePicker,
	MuiPickersUtilsProvider,
} from '@material-ui/pickers'
import {
	Card,
	CategoryTitle,
	InputContainer,
	ItemList,
	ItemListContainer,
	MultipleItemInputContainer,
	StyledTextField,
} from '../../../styles'
import {
	addValToArr,
	codeGenerator,
	jobCodeGenerator,
	renderArr,
} from '../../../utils/helperFunctions'
import Axios from 'axios'
import { createJob } from '../../../api'

function JobInput() {
	// jobopeninginfo
	const [jobTitle, setJobTitle] = useState('')
	const [jobType, setJobType] = useState('Full-time')
	const [industry, setIndustry] = useState('')
	const [noOfOpening, setNoOfOpening] = useState()

	//companydetails
	const [companyName, setCompanyName] = useState('')
	const [companyAddress, setCompanyAddress] = useState('')
	const [isCompanyDetailsVisible, setIsCompanyDetailsVisible] = useState(true)
	console.log(isCompanyDetailsVisible)
	//jobaddress
	const [jobLocation, setJobLocation] = useState('On Location')
	const [city, setCity] = useState('')
	const [zone, setZone] = useState('North')
	const [state, setState] = useState('')
	const [pincode, setPincode] = useState()
	const [country, setCountry] = useState()

	//jobdetails
	const [jobDescription, setJobDescription] = useState('')

	const [eligibility, setEligibility] = useState([])
	const [eligibilityVal, setEligibilityVal] = useState()

	const [responsibilities, setResponsibilities] = useState([])
	const [responsibilitiesVal, setResponsibilitiesVal] = useState()

	const [benefits, setBenefits] = useState([])
	const [benefitsVal, setBenefitsVal] = useState()

	const [additionalInformation, setAdditionalInformation] = useState()
	const [targetDate, setTargetDate] = useState()

	//functions
	const resetFields = () => {}

	//handlers
	const saveHandler = async () => {
		const newJobData = {
			jobOpeningInfo: {
				jobTitle,
				jobType,
				industry,
				assignedOn: new Date(),
				noOfOpenings: Number(noOfOpening),
			},
			companyDetails: {
				companyName,
				companyAddress,
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
				jobCode: codeGenerator(jobTitle, industry, companyName),
				jobDescription,
				additionalInformation,
				targetDate,
				eligibility,
				responsibilities,
				benefits,
			},
		}
		console.log('Saving..')
		try {
			const { data } = await Axios.post(createJob, newJobData)
		} catch (err) {
			alert(err)
		}
		console.log(newJobData)
	}

	return (
		<JobInputContainer>
			{/* Control */}
			<Controls title='Job Control'>
				<Button color='secondary'>Reset</Button>
				<Button variant='contained' color='primary' onClick={saveHandler}>
					Save
				</Button>
			</Controls>

			<Card>
				<InputContainer>
					<CategoryTitle>Job Opening Info</CategoryTitle>

					<StyledTextField
						value={jobTitle}
						onChange={(e) => setJobTitle(e.target.value)}
						label='Job Title'
					/>

					<InputLabel id='demo-simple-select-label'>Job Type</InputLabel>
					<Select
						value={jobType}
						onChange={(e) => setJobType(e.target.value)}
						id='demo-simple-select'
						labelId='demo-simple-select-label'>
						<MenuItem value='Full-time'>Full-Time</MenuItem>
						<MenuItem value='Part-time'>Part-time</MenuItem>
						<MenuItem value='Freelancing'>Part-time</MenuItem>
					</Select>
					<StyledTextField
						value={industry}
						onChange={(e) => setIndustry(e.target.value)}
						label='Industry'
					/>
					<StyledTextField
						value={noOfOpening}
						onChange={(e) => setNoOfOpening(e.target.value)}
						type='number'
						label='No. of Opening'
					/>
				</InputContainer>

				<InputContainer>
					<CategoryTitle>Company Details</CategoryTitle>
					<StyledTextField
						value={companyName}
						onChange={(e) => setCompanyName(e.target.value)}
						label='Company Name'
					/>
					<StyledTextField
						value={companyAddress}
						multiline
						rows={4}
						rowsMax={4}
						onChange={(e) => setCompanyAddress(e.target.value)}
						label='Company Address'
					/>
					<Checkbox
						value={isCompanyDetailsVisible}
						onChange={(e) => setIsCompanyDetailsVisible((prev) => !prev)}
						aria-label='Visible'
						defaultChecked
						color='primary'
						inputProps={{ 'aria-label': 'secondary checkbox' }}
					/>
				</InputContainer>

				<InputContainer>
					<CategoryTitle>Job Address</CategoryTitle>
					<InputLabel id='demo-simple-select-label'>Job Location</InputLabel>
					<Select
						value={jobLocation}
						onChange={(e) => setJobLocation(e.target.value)}
						id='demo-simple-select'
						labelId='demo-simple-select-label'>
						<MenuItem value='On Location'>On Location</MenuItem>
						<MenuItem value='Remote'>Remote</MenuItem>
					</Select>

					<StyledTextField
						value={city}
						onChange={(e) => setCity(e.target.value)}
						label='City'
					/>

					<InputLabel id='demo-simple-select-label'>Job Location</InputLabel>
					<Select
						value={zone}
						onChange={(e) => setJobLocation(e.target.value)}
						id='demo-simple-select'
						labelId='demo-simple-select-label'>
						<MenuItem value='North'>North</MenuItem>
						<MenuItem value='East'>East</MenuItem>
						<MenuItem value='West'>West</MenuItem>
						<MenuItem value='South'>South</MenuItem>
						<MenuItem value='North-East'>North-East</MenuItem>
						<MenuItem value='North-West'>North-West</MenuItem>
						<MenuItem value='South-East'>South-East</MenuItem>
						<MenuItem value='South-West'>South-West</MenuItem>
					</Select>

					<StyledTextField
						value={state}
						onChange={(e) => setState(e.target.value)}
						label='State'
					/>
					<StyledTextField
						value={pincode}
						onChange={(e) => setPincode(e.target.value)}
						label='Pincode'
					/>
					<StyledTextField
						value={country}
						onChange={(e) => setCountry(e.target.value)}
						label='Country'
					/>
				</InputContainer>

				<InputContainer>
					<CategoryTitle>Job Details</CategoryTitle>

					{eligibility.length > 0 && (
						<ItemListContainer>
							{renderArr(eligibility, setEligibility)}
						</ItemListContainer>
					)}

					<MultipleItemInputContainer
						onSubmit={(e) =>
							addValToArr(e, eligibilityVal, eligibility, setEligibility)
						}>
						<StyledTextField
							value={eligibilityVal}
							onChange={(e) => setEligibilityVal(e.target.value)}
							label='Eligibility'
						/>
						<Button type='submit' variant='contained' color='primary'>
							Add
						</Button>
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
						<StyledTextField
							label='Responsibilities'
							value={responsibilitiesVal}
							onChange={(e) => setResponsibilitiesVal(e.target.value)}
						/>
						<Button type='submit' variant='contained' color='primary'>
							Add
						</Button>
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
						<StyledTextField
							label='Benefits'
							value={benefitsVal}
							onChange={(e) => setBenefitsVal(e.target.value)}
						/>
						<Button type='submit' variant='contained' color='primary'>
							Add
						</Button>
					</MultipleItemInputContainer>

					<StyledTextField
						multiline
						rows={4}
						rowsMax={4}
						value={jobDescription}
						onChange={(e) => setJobDescription(e.target.value)}
						label='Job Description'
					/>

					<StyledTextField
						multiline
						rows={4}
						rowsMax={4}
						value={additionalInformation}
						onChange={(e) => setAdditionalInformation(e.target.value)}
						label='Additional Information'
					/>
					<input
						value={targetDate}
						onChange={(e) => setTargetDate(e.target.value)}
						type='date'
						placeholder='Target Date'
					/>
				</InputContainer>
			</Card>

			{/* inputs */}
		</JobInputContainer>
	)
}

export default JobInput

const JobInputContainer = styled.div``
