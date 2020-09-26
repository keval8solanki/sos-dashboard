import React, { useState } from 'react'
import styled from 'styled-components'
import { Card, RemoveSpaces, themeBorder } from '../styles/index'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import { Button } from '@material-ui/core'
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined'
import { useHistory, useLocation } from 'react-router-dom'
import { useRecoilState, useRecoilValue } from 'recoil'
import { currentUserAtom, isAuthAtom } from '../recoil/atoms'

function Navbar() {
	const [anchorEl, setAnchorEl] = useState(null)
	const [isAuth, setIsAuth] = useRecoilState(isAuthAtom)
	const currentUser = useRecoilValue(currentUserAtom)
	const history = useHistory()
	const handleClick = (event) => setAnchorEl(event.currentTarget)
	const handleClose = () => setAnchorEl(null)

	const navHandler = () => {
		history.push(`/profile`)
		handleClose()
	}

	const logoutHandler = () => {
		setIsAuth(false)
		handleClose()
		history.push(`/`)
	}

	return (
		<NavbarContainer>
			{/* Logo */}
			<Logo>
				Switch <LogoHighlight>On Success</LogoHighlight>
			</Logo>

			<Button startIcon={<AccountCircleOutlinedIcon />} onClick={handleClick}>
				{currentUser.firstName}
			</Button>
			<Menu
				anchorEl={anchorEl}
				keepMounted
				open={Boolean(anchorEl)}
				onClose={handleClose}>
				<MenuItem onClick={navHandler}>Profile</MenuItem>
				<MenuItem onClick={logoutHandler}>Logout</MenuItem>
			</Menu>
		</NavbarContainer>
	)
}

export default Navbar

const NavbarContainer = styled.div`
	display: flex;
	align-items: center;
	position: sticky;
	padding: 10px 20px;
	${themeBorder}
	border-radius: 0px;
	justify-content: space-between;
`
const Logo = styled.h4`
	${RemoveSpaces};
	color: blue;
`

const LogoHighlight = styled.span`
	color: orange;
`
const NavItemContainer = styled.div``
