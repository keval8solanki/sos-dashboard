import { SMUIButton, SMUITextField } from '../../../styles/StyledMaterialUI'
import React, { useState } from 'react'
import styled from 'styled-components'
import { RemoveSpaces, StyledTextField } from '../../../styles'
import { Button, TextField } from '@material-ui/core'
import { useRecoilState } from 'recoil'
import { credentialAtom } from '../../../recoil/atoms'
import { useHistory } from 'react-router-dom'

function SigninForm() {
	const history = useHistory()
	const [cred, setCred] = useRecoilState(credentialAtom)

	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	const submitHandler = (e) => {
		e.preventDefault()
		setCred({ email, password })
		history.push('/')
	}
	console.log(cred)
	return (
		<SigninFormContainer onSubmit={submitHandler}>
			<SiginFormTitle>SOS Dashboard</SiginFormTitle>
			<SiginFormDesc>Welcome Back, Please enter your credentials</SiginFormDesc>
			<SigninInput
				required
				value={email}
				onChange={(e) => setEmail(e.target.value)}
				label='Email'
				variant='outlined'
				type='email'
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
