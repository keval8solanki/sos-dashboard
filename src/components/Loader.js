import React from 'react'
import styled from 'styled-components'
import LoaderIcon from '../assets/icons/loader.svg'

function Loader() {
	return (
		<LoaderContainer>
			<LoaderIconContainer src={LoaderIcon} />
		</LoaderContainer>
	)
}

export default Loader

const LoaderContainer = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
`

const LoaderIconContainer = styled.img`
	width: 100px;
`
