import { Button, IconButton, MenuItem, Select } from '@material-ui/core'
import Axios from 'axios'
import React, { useState } from 'react'
import { createCandidate } from '../../../api'
import Controls from '../../../components/Controls'
import {
	Card,
	CardTitle,
	CategoryTitle,
	ContentContainer,
	ControlButton,
	InputContainer,
	ItemListContainer,
	MultipleItemInputContainer,
	StyledTextField,
} from '../../../styles'
import {
	addValToArr,
	codeGenerator,
	renderArr,
} from '../../../utils/helperFunctions'

import { SMUISelect, SMUITextField } from '../../../styles/StyledMaterialUI'
import AddCircleIcon from '@material-ui/icons/AddCircle'

function CandidateInput() {
	// Basic
	const [fullName, setFullName] = useState()
	const [primaryEmail, setPrimaryEmail] = useState()
	const [secondaryEmail, setSecondaryEmail] = useState()
	const [mobile, setMobile] = useState()
	const [pan, setPan] = useState()
	const [dateOfBirth, setDateOfBirth] = useState()

	// Address
	const [streetName, setStreetName] = useState()
	const [state, setState] = useState()
	const [country, setCountry] = useState()
	const [pincode, setPincode] = useState()

	// Professional
	const [experience, setExperience] = useState([])
	const [education, setEducation] = useState([])
	const [skillSet, setSkillSet] = useState([])
	const [skillSetVal, setSkillSetVal] = useState()

	const [currentSalary, setCurrentSalary] = useState()
	const [expected, setExpected] = useState()
	const [industry, setIndustry] = useState('Finance')
	const [functionalArea, setFunctionalArea] = useState('Software')

	const [jobTitle, setJobTitle] = useState()
	const [company, setCompany] = useState()
	const [summary, setSummary] = useState()
	const [fromDate, setFromDate] = useState()
	const [tillDate, setTillDate] = useState()

	const [qualificationName, setQualificationName] = useState()
	const [instituteName, setInstituteName] = useState()
	const [studiedFromDate, setStudiedFromDate] = useState()
	const [studiedTillDate, setStudiedTillDate] = useState()

	const addExpHandler = () => {
		const data = {
			jobTitle,
			company,
			summary,
			fromDate,
			tillDate,
		}

		const tempExp = [...experience]
		tempExp.push(data)
		setExperience(tempExp)
	}

	const addEduHandler = () => {
		const data = {
			qualificationName,
			instituteName,
			studiedFromDate,
			studiedTillDate,
		}

		const tempEdu = [...education]
		tempEdu.push(data)
		setEducation(tempEdu)
	}

	const saveHandler = async () => {
		const candidateData = {
			basic: {
				fullName,
				primaryEmail,
				secondaryEmail,
				mobile,
				pan,
				dateOfBirth: new Date(dateOfBirth),
			},

			professional: {
				experience,
				education,
				skillSet,
				currentSalary: Number(currentSalary),
				expected: Number(expected),
				industry,
				functionalArea,
			},
			candidateCode: codeGenerator(fullName, pan, mobile),
			status: 'New',
			stage: 'Not Applied',

			address: {
				streetName,
				state,
				country,
				pincode,
			},
		}

		try {
			await Axios.post(createCandidate, candidateData)
		} catch (err) {
			alert(err)
		}
		console.log(candidateData)
	}

	return (
		<>
			<Controls title='Candidate Controls'>
				<ControlButton color='secondary'>Reset</ControlButton>
				<ControlButton
					onClick={saveHandler}
					variant='contained'
					color='primary'>
					Save
				</ControlButton>
			</Controls>
			<ContentContainer>
				<Card>
					<CardTitle>Personal Information - Basic</CardTitle>
					<SMUITextField
						value={fullName}
						onChange={(e) => setFullName(e.target.value)}
						label='Full Name'
					/>

					<SMUITextField
						type='email'
						value={[primaryEmail]}
						onChange={(e) => setPrimaryEmail(e.target.value)}
						label='Primary Email'
					/>

					<SMUITextField
						type='email'
						value={secondaryEmail}
						onChange={(e) => setSecondaryEmail(e.target.value)}
						label='Secondary Email'
					/>

					<SMUITextField
						value={mobile}
						onChange={(e) => setMobile(e.target.value)}
						label='Mobile No.'
					/>

					<SMUITextField
						value={pan}
						onChange={(e) => setPan(e.target.value)}
						label='PAN No'
					/>

					<SMUITextField
						type='date'
						value={dateOfBirth}
						onChange={(e) => setDateOfBirth(e.target.value)}
					/>
				</Card>

				<Card>
					<CardTitle>Personal Information - Address</CardTitle>
					<SMUITextField
						value={streetName}
						onChange={(e) => setStreetName(e.target.value)}
						label='Street Name'
					/>

					<SMUITextField
						value={state}
						onChange={(e) => setState(e.target.value)}
						label='State'
					/>

					<SMUITextField
						value={country}
						onChange={(e) => setCountry(e.target.value)}
						label='Country'
					/>

					<SMUITextField
						value={pincode}
						onChange={(e) => setPincode(e.target.value)}
						label='Pincode'
					/>
				</Card>
				<Card>
					<CardTitle>Personal Information - Professional</CardTitle>

					<SMUITextField
						value={currentSalary}
						onChange={(e) => setCurrentSalary(e.target.value)}
						label='Current Salary'
					/>

					<SMUITextField
						value={expected}
						onChange={(e) => setExpected(e.target.value)}
						label='Expected Salary'
					/>

					<SMUISelect
						value={industry}
						onChange={(e) => setIndustry(e.target.value)}>
						<MenuItem value='Finance'>Finance</MenuItem>
						<MenuItem value='Marketing'>Marketing</MenuItem>
					</SMUISelect>

					<SMUISelect
						value={functionalArea}
						onChange={(e) => setFunctionalArea(e.target.value)}>
						<MenuItem value='Software'>Software</MenuItem>
						<MenuItem value='Accounting'>Accounting</MenuItem>
					</SMUISelect>

					{skillSet.length > 0 && (
						<ItemListContainer>
							{renderArr(skillSet, setSkillSet)}
						</ItemListContainer>
					)}

					<MultipleItemInputContainer
						onSubmit={(e) =>
							addValToArr(e, skillSetVal, skillSet, setSkillSet)
						}>
						<SMUITextField
							value={skillSetVal}
							onChange={(e) => setSkillSetVal(e.target.value)}
							label='Skill Set'
						/>
						<Button type='submit' variant='contained' color='primary'>
							Add
						</Button>
					</MultipleItemInputContainer>
				</Card>

				<Card>
					<CardTitle>Experience</CardTitle>

					{experience.map(
						({ jobTitle, company, summary, fromDate, tillDate }) => {
							return (
								<div key={jobTitle}>
									<h1>Job Title</h1>
									<p>{jobTitle}</p>
									<h1>Company</h1>
									<p>{company}</p>
									<h1>Summary</h1>
									<p>{summary}</p>
									<h1>From Date</h1>
									<p>{fromDate}</p>
									<h1>Till Date</h1>
									<p>{tillDate}</p>
								</div>
							)
						}
					)}

					<SMUITextField
						value={jobTitle}
						onChange={(e) => setJobTitle(e.target.value)}
						label='Job Title'
					/>
					<SMUITextField
						value={company}
						onChange={(e) => setCompany(e.target.value)}
						label='Company'
					/>
					<SMUITextField
						value={summary}
						onChange={(e) => setSummary(e.target.value)}
						label='Summary'
					/>
					<SMUITextField
						type='date'
						value={fromDate}
						onChange={(e) => setFromDate(e.target.value)}
					/>
					<SMUITextField
						type='date'
						value={tillDate}
						onChange={(e) => setTillDate(e.target.value)}
					/>
					<IconButton
						onClick={addExpHandler}
						variant='contained'
						color='primary'>
						<AddCircleIcon />
					</IconButton>
				</Card>
				<Card>
					<CardTitle>Education</CardTitle>

					{education.map(
						({
							qualificationName,
							instituteName,
							studiedFromDate,
							studiedTillDate,
						}) => {
							return (
								<div key={qualificationName}>
									<h1>Qualification</h1>
									<p>{qualificationName}</p>
									<h1>Institute</h1>
									<p>{instituteName}</p>

									<h1>Studied From</h1>
									<p>{studiedFromDate}</p>
									<h1>Studied Till</h1>
									<p>{studiedTillDate}</p>
								</div>
							)
						}
					)}
					<SMUITextField
						value={qualificationName}
						onChange={(e) => setQualificationName(e.target.value)}
						label='Qualification Name'
					/>
					<SMUITextField
						value={instituteName}
						onChange={(e) => setInstituteName(e.target.value)}
						label='Institute Name'
					/>
					<SMUITextField
						type='date'
						value={studiedFromDate}
						onChange={(e) => setStudiedFromDate(e.target.value)}
					/>
					<SMUITextField
						type='date'
						value={studiedTillDate}
						onChange={(e) => setStudiedTillDate(e.target.value)}
					/>
					<IconButton
						onClick={addEduHandler}
						variant='contained'
						color='primary'>
						<AddCircleIcon />
					</IconButton>
				</Card>
			</ContentContainer>
		</>
	)
}

export default CandidateInput
