import { Card, themeBorder } from '../styles'
import React, { useEffect, useMemo, useState } from 'react'
import styled from 'styled-components'
import { Button, MenuItem, Select } from '@material-ui/core'
import SearchIcon from '../assets/icons/search.svg'

function SearchBar({ options }) {
	const [searchCriteria, setSearchCriteria] = useState(options[0].value)
	const [searchVal, setSearchVal] = useState('')
	console.log(searchVal)
	const renderOption = () =>
		options.map(({ value, name }) => {
			return <MenuItem value={value}>{name}</MenuItem>
		})


	const searchInputHandler = (e) => setSearchVal(e.target.value)
	const searchCriteriaHandler = (e) => setSearchCriteria(e.target.value)

	return (
		<SearchBarForm>
			<StyledSelect value={searchCriteria} onChange={searchCriteriaHandler}>
				{renderOption()}
			</StyledSelect>
			<SearchInput
				value={searchVal}
				onChange={searchInputHandler}
				placeholder='Search Here...'
			/>

			<Button>
				<img src={SearchIcon} alt='Search Icon' />
			</Button>
		</SearchBarForm>
	)
}

export default SearchBar

const StyledSelect = styled(Select)`
	padding: 0px 20px;
`

const SearchBarForm = styled.form`
	display: flex;
	margin: 10px 0px;
	justify-content: space-between;
	${themeBorder}
	background-color: white;
`
const SearchInput = styled.input`
	flex: 1;
	padding: 0px 10px;
	border-style: none;
	&:focus {
		outline: none;
	}
`
