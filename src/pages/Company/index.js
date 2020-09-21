import React from 'react'
import { PageLayout } from '../../styles'
import Controls from '../../components/Controls'
import { Button } from '@material-ui/core'
import SearchBar from '../../components/SearchBar'
import { useHistory, useLocation } from 'react-router-dom'

function CompanyPage() {
	const history = useHistory()
	const location = useLocation().pathname

	const options = [
		{ value: 'companyName', name: 'Company Name' },
		{ value: 'companyAddress', name: 'Company Address' },
	]

	
	const navHandler = (to) => {
		history.push(`${location}/${to}`)
	}

	return (
		<>
			<Controls title='Company'>
				<Button onClick={()=>navHandler('add')} variant='contained' color='primary'>
					Add
				</Button>
			</Controls>
		</>
	)
}

export default CompanyPage
