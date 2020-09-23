
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Sidebar from './components/Sidebar'
import { HashRouter, Switch, Route } from 'react-router-dom'
import DashboardPage from './pages/Dashboard'
import JobPage from './pages/Job/JobPage'
import CandidatePage from './pages/Candidate'
import RolePage from './pages/Role'
import UserPage from './pages/User'
import AddJob from './pages/Job/AddJob'
import JobDetails from './pages/Job/JobDetails'
import AddCandidate from './pages/Candidate/AddCandidate'
import CandidateDetails from './pages/Candidate/CandidateDetails'
import ApplyJobList from './pages/Job/ApplyJobList'
import ProfilePage from './pages/Profile'
import CompanyPage from './pages/Company'
import AddCompany from './pages/Company/AddCompany'
import Signin from './pages/Signin'
import { useRecoilState, useRecoilValue } from 'recoil'
import { credentialAtom, isAuthAtom } from './recoil/atoms'
import Navbar from './components/Navbar'
import AddRole from './pages/Role/AddRole'
import AddUser from './pages/User/AddUser'

function App() {
	
	const [isAuth, setIsAuth] = useRecoilState(isAuthAtom)
	const cred = useRecoilValue(credentialAtom)
	useEffect(() => {
		const { email, password } = cred
		if (email === 'k@g.com' && password === 'hello') {
			setIsAuth(true)
		}
	}, [cred])

	

	const routes = (
		<Switch>
			<Route path='/' exact component={DashboardPage} />
			<Route path='/job/add' component={AddJob} />
			<Route path='/job/apply' component={ApplyJobList} />
			<Route path='/job/:id' component={JobDetails} />
			<Route path='/job' component={JobPage} />

			<Route path='/candidate/add' component={AddCandidate} />
			<Route path='/candidate/:id' component={CandidateDetails} />
			<Route path='/candidate' component={CandidatePage} />

			<Route path='/company/add' component={AddCompany} />
			<Route path='/company' component={CompanyPage} />

			<Route path='/role/add' component={AddRole} />
			<Route path='/role' component={RolePage} />

			<Route path='/user/add' component={AddUser} />
			<Route path='/user' component={UserPage} />

			<Route path='/profile' component={ProfilePage} />
		</Switch>
	)

	return (
		<AppContainer>
			<HashRouter>
				{isAuth ? (
					<>
						<Navbar />
						<Layout>
							<Sidebar />
							<ComponentContainer>{routes}</ComponentContainer>
						</Layout>
					</>
				) : (
					<Signin />
				)}
			</HashRouter>
		</AppContainer>
	)
}

export default App

const AppContainer = styled.div`
	text-align: center;
	height: 100%;
`
const Layout = styled.div`
	display: flex;
	height: 90%;
	width: 100%;
`

const ComponentContainer = styled.div`
	flex: 1;
	background-color: #0000000d;
	/* height: 100%; */
	overflow-y: auto;
	scroll-behavior: smooth;
	/* padding: 10px; */
`
