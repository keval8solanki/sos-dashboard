import React from 'react'
import styled from 'styled-components'
import {
	CategoryTitle,
	DataContent,
	DataTitle,
	themeBorder,
} from '../../../styles'
import JobDetails from '../JobDetails'
import { v4 as uuid } from 'uuid'

function JobInfo({ job }) {
	const renderList = (data) =>
		data && data.map((item) => <li key={uuid()}>{item}</li>)

	const { companyDetails, jobAddress, jobDetails, jobOpeningInfo } = job
	const { companyName, companyAddress } = companyDetails
	const { city, country, jobLocation, pincode, state, zone } = jobAddress
	const {
		eligibility,
		responsibilities,
		benefits,
		jobCode,
		additionalInformation,
		jobDescription,
		targetDate,
	} = jobDetails

	const {
		assignedOn,
		industry,
		jobTitle,
		jobType,
		noOfOpenings,
	} = jobOpeningInfo

	return (
		<JobInfoContainer>
			<DataContainer>
				<CategoryTitle>Job Opening Info</CategoryTitle>
				<DataTitle>Assigned on</DataTitle>
				<DataContent>{job.jobOpeningInfo.assignedOn}</DataContent>

				<DataTitle>Industry</DataTitle>
				<DataContent>{job.jobOpeningInfo.industry}</DataContent>

				<DataTitle>Job Title</DataTitle>
				<DataContent>{job.jobOpeningInfo.jobTitle}</DataContent>

				<DataTitle>Job Type</DataTitle>
				<DataContent>{job.jobOpeningInfo.jobType}</DataContent>

				<DataTitle>No of Openings</DataTitle>
				<DataContent>{job.jobOpeningInfo.noOfOpenings}</DataContent>
			</DataContainer>
			<DataContainer>
				<CategoryTitle>Job Address</CategoryTitle>

				<DataTitle>City</DataTitle>
				<DataContent>{job.jobAddress.city}</DataContent>

				<DataTitle>Country</DataTitle>
				<DataContent>{job.jobAddress.country}</DataContent>

				<DataTitle>Job Location</DataTitle>
				<DataContent>{job.jobAddress.jobLocation}</DataContent>

				<DataTitle>Pincode</DataTitle>
				<DataContent>{job.jobAddress.pincode}</DataContent>

				<DataTitle>State</DataTitle>
				<DataContent>{job.jobAddress.state}</DataContent>

				<DataTitle>Zone</DataTitle>
				<DataContent>{job.jobAddress.zone}</DataContent>
			</DataContainer>
			<DataContainer>
				<CategoryTitle>Job Details</CategoryTitle>
				<DataTitle>Job Code</DataTitle>
				<DataContent>{job.jobDetails.jobCode}</DataContent>
				<DataTitle>Job Description</DataTitle>
				<DataContent>{job.jobDetails.jobDescription}</DataContent>
				<DataTitle>Additional Information</DataTitle>
				<DataContent>{job.jobDetails.additionalInformation}</DataContent>
				<DataTitle>Eligibility</DataTitle>
				<ol>{renderList(job.jobDetails.eligibility)}</ol>

				<DataTitle>Responsiblities</DataTitle>
				<ol>{renderList(job.jobDetails.responsibilities)}</ol>

				<DataTitle>Benefits</DataTitle>
				<ol>{renderList(job.jobDetails.benefits)}</ol>
			</DataContainer>
			<DataContainer>
				<CategoryTitle>Company Details</CategoryTitle>
				<DataTitle>Company Name</DataTitle>
				<DataContent>{job.companyDetails.companyName}</DataContent>
				<DataTitle>Company Address</DataTitle>
				<DataContent>{job.companyDetails.companyAddress}</DataContent>
			</DataContainer>
		</JobInfoContainer>
	)
}

export default JobInfo
const JobInfoContainer = styled.div`
	background-color: white;
	${themeBorder};

	padding: 20px;
	display: flex;
	flex-direction: column;
	align-items: flex-start;
`

const DataContainer = styled.div``
