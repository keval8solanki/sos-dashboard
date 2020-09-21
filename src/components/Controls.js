import { Card } from '@material-ui/core'
import React from 'react'
import styled from 'styled-components'
import { RemoveSpaces } from '../styles'
import SearchBar from './SearchBar'

function Controls({ title, children }) {
	const options = [
		{ value: 'jobCode', name: 'Job Code' },
		{ value: 'jobTitle', name: 'Job Title' },
		{ value: 'company', name: 'company' },
		{ value: 'city', name: 'City' },
		{ value: 'noOfOpening', name: 'Openings' },
		{ value: 'noOfResume', name: 'Resume' },
	]
	return (
		<ControlContainer>
			<ControlTitle>{title}</ControlTitle>

			<ControlButtonContainer>{children}</ControlButtonContainer>
		</ControlContainer>
	)
}

export default Controls

const ControlContainer = styled.div`
	position: sticky;
	top: 0px;
	z-index: 10;
	padding: 10px 20px;
	background-color: white;
	display: flex;
	border: 1px solid #0000003b;
	border-top: none;
	border-left: none;
	/* border-radius: 6px; */
	align-items: center;
	justify-content: space-between;
`

const ControlTitle = styled.h4`
	${RemoveSpaces}
	color: #333;
`

const ControlButtonContainer = styled.div``
