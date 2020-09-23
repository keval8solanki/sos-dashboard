import React from 'react'
import styled from 'styled-components'
import DashboardIcon from '../assets/icons/dashboard.svg'
import JobIcon from '../assets/icons/job.svg'
import CandidateIcon from '../assets/icons/candidate.svg'
import RoleIcon from '../assets/icons/role.svg'
import UserIcon from '../assets/icons/user.svg'
import CompanyIcon from '../assets/icons/company.svg'
import ProfileIcon from '../assets/icons/profile.svg'

import { v4 as uniqueID } from 'uuid'
import { StyledNavlink } from '../styles'

function Sidebar() {
	const sidebarData = [
		{
			icon: DashboardIcon,
			linkTo: '/',
			text: 'Dashboard',
		},
		{
			icon: JobIcon,
			linkTo: '/job',
			text: 'Job',
		},
		{
			icon: CandidateIcon,
			linkTo: '/candidate',
			text: 'Candidate',
		},
		{
			icon: CompanyIcon,
			linkTo: '/company',
			text: 'Company',
		},
		{
			icon: RoleIcon,
			linkTo: '/role',
			text: 'Role',
		},
		{
			icon: UserIcon,
			linkTo: '/user',
			text: 'User',
		},
	]

	const activeLinkStyle = {
		color: '#0168fa',
		backgroundColor: '#EEF0F7',
		fontWeight: '500',
		boxShadow: 'inset 1px 1px 3px 0px #016afa2e',
	}

	const renderLinks = sidebarData.map(({ icon, linkTo, text }) => {
		return (
			<MenuItem key={uniqueID()}>
				<StyledNavlink activeStyle={activeLinkStyle} to={linkTo}>
					<NavIcon src={icon} />
					{text}
				</StyledNavlink>
			</MenuItem>
		)
	})

	return <SidebarContainer>{renderLinks}</SidebarContainer>
}

export default Sidebar

const SidebarContainer = styled.ul`
	background-color: white;
	list-style: none;
	margin: 0px;
	padding: 0px;
	border: 1px solid #0000003b;
	border-top: 0px;
	padding: 10px;
	text-align: left;
	/* overflow-y: scroll; */
`

const MenuItem = styled.li``

const NavIcon = styled.img`
	margin-right: 10px;
`
