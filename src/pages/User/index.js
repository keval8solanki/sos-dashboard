import React from 'react'
import { PageLayout } from '../../styles'
import Controls from '../../components/Controls'
import { Button } from '@material-ui/core'
import SearchBar from '../../components/SearchBar'

function UserPage() {
	const options = [
		{ value: 'companyName', name: 'Company Name' },
		{ value: 'companyAddress', name: 'Company Address' },
	]
	return (
		<>
			<Controls title='User'>
				<Button>Save</Button>
			</Controls>
		</>
	)
}

export default UserPage
