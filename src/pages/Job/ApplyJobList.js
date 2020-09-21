import React from 'react'
import { PageLayout } from '../../styles'
import JobPage from './JobPage'
import styled from 'styled-components'
function ApplyJobList() {
	return (
		<ApplyJobListContainer>
			<JobPage toApply />
		</ApplyJobListContainer>
	)
}

export default ApplyJobList

const ApplyJobListContainer = styled.div`
	width: 100%;
	
`
