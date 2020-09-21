import React from 'react'
import CompanyInput from './components/CompanyInput'
import styled from 'styled-components'
function AddCompany() {
	return (
		<AddCompanyContainer>
			<CompanyInput />
		</AddCompanyContainer>
	)
}

export default AddCompany

const AddCompanyContainer = styled.div`
	height: 100vh;
`
