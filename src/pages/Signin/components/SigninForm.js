import { SMUIButton, SMUITextField } from '../../../styles/StyledMaterialUI'
import React, { useState } from 'react'
import styled from 'styled-components'
import { RemoveSpaces, StyledTextField } from '../../../styles'
import { Button, TextField } from '@material-ui/core'
import { useRecoilState } from 'recoil'
import {
	credentialAtom,
	currentUserAtom,
	isAuthAtom,
} from '../../../recoil/atoms'
import { useHistory } from 'react-router-dom'
import { loginEndpoint } from '../../../api'

import axios from 'axios'
import { encryptObj } from '../../../utils/helperFunctions'

import { toast } from '../../../components/Toast'

function SigninForm() {
	const history = useHistory()

	const [user, setUser] = useState('')
	const [password, setPassword] = useState('')
	const [isAuth, setIsAuth] = useRecoilState(isAuthAtom)
	const [currentUser, setCurrentUser] = useRecoilState(currentUserAtom)

	const submitHandler = async (e) => {
		e.preventDefault()
		const cred = { user, password }
		const data = encryptObj(cred)
		try {
			const resData = await axios.post(
				loginEndpoint,
				{ data },
				{ withCredentials: true }
			)
			if (resData.data.userData) {
				setIsAuth(true)
				setCurrentUser(resData.data.userData)
				history.push('/dashboard')
			}
		} catch (error) {
			toast.error('Invalid Credentials')
		}
	}

	return (
		<SigninFormContainer onSubmit={submitHandler}>
			<SiginFormTitle>SOS Dashboard</SiginFormTitle>
			<SiginFormDesc>Welcome Back, Please enter your credentials</SiginFormDesc>
			<SigninInput
				required
				value={user}
				onChange={(e) => setUser(e.target.value)}
				label='Email / Username'
				variant='outlined'
				type='text'
			/>
			<SigninInput
				required
				value={password}
				onChange={(e) => setPassword(e.target.value)}
				label='Password'
				variant='outlined'
				type='password'
			/>
			<SignInButton type='submit' variant='contained' color='primary'>
				Sign In
			</SignInButton>
		</SigninFormContainer>
	)
}

export default SigninForm

const SiginFormTitle = styled.h1`
	${RemoveSpaces};
	padding-bottom: 5px;
`

const SiginFormDesc = styled.p`
	${RemoveSpaces};
	padding-bottom: 30px;
`

const SigninInput = styled(TextField)`
	&& {
		margin: 10px 0px;
	}
`

const SignInButton = styled(Button)`
	&& {
		margin: 10px 0px;

		/* padding: 15px; */
	}
`

const SigninFormContainer = styled.form`
	display: flex;
	flex: 1;
	padding: 70px;
	flex-direction: column;
	text-align: left;
	justify-content: space-around;
`
