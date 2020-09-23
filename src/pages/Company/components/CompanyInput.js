import styled from 'styled-components'
import { Button, TextField } from '@material-ui/core'
import React, { useState } from 'react'
import Controls from '../../../components/Controls'
import {
	Card,
	ContentContainer,
	RemoveSpaces,
	ControlButton,
} from '../../../styles'
import Axios from 'axios'
import { companyEndpoint } from '../../../api'

function CompanyInput() {
	const [companyName, setCompanyName] = useState('')
	const [companyAddress, setCompanyAddress] = useState('')

	const AddCompanyHandler = async () => {
		const companyData = {
			companyName,
			companyAddress,
		}
		try {
			await Axios.post(companyEndpoint, companyData)
			alert('Company Added')
		} catch (err) {
			alert(err)
		}
		console.log(companyData)
	}

	return (
		<>
			<Controls title='Add Company'>
				<ControlButton color='secondary'>Reset</ControlButton>
				<ControlButton
					onClick={AddCompanyHandler}
					color='primary'
					variant='contained'>
					Save
				</ControlButton>
			</Controls>
			<ContentContainer>
				<Card>
					<Title>Company Details</Title>
					<CompanyTextField
						value={companyName}
						onChange={(e) => setCompanyName(e.target.value)}
						label='Company Name'
					/>
					<CompanyTextField
						value={companyAddress}
						onChange={(e) => setCompanyAddress(e.target.value)}
						variant='outlined'
						multiline
						rows={4}
						rowsMax={4}
						label='Company Address'
					/>
				</Card>
			</ContentContainer>
		</>
	)
}

export default CompanyInput

const Title = styled.h5`
	text-align: left;
	${RemoveSpaces};
	padding: 5px 0px;
`

const CompanyTextField = styled(TextField)`
	&& {
		width: 100%;
		margin: 10px 0px;
		font-size: 0.8em;
	}
`
