import React from 'react'
import { PageLayout } from '../../styles'
import Controls from '../../components/Controls'
import { Button } from '@material-ui/core'
import SearchBar from '../../components/SearchBar'

function RolePage() {
	const options = [
		{ value: 'companyName', name: 'Company Name' },
		{ value: 'companyAddress', name: 'Company Address' },
	]
	return (
		<>
			<Controls title='Role'>
				<Button>Save</Button>
			</Controls>
		</>
	)
}

export default RolePage
