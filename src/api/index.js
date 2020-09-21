// Development
export const API_URI = 'http://localhost:4000'

// Production
// export const API_URI = 'https://recruit-x.herokuapp.com'
// export const API_URI = 'https://final-mvp.herokuapp.com'

const action = {
	READ: 'read',
	CREATE: 'create',
	UPDATE: 'update',
	DELETE: 'delete',
}

export const createJob = `${API_URI}/job`
export const updateJob = `${API_URI}/${action.UPDATE}`
export const getJobs = `${API_URI}/jobs`

export const getJob = `${API_URI}/job`
export const deleteJob = `${API_URI}/job`
export const deleteJobs = `${API_URI}/jobs`

export const createCandidate = `${API_URI}/candidate`
export const getCandidates = `${API_URI}/candidates`

export const applyJob = `${API_URI}/apply`

// export const getPublicJobs = `${API_URI}/public-jobs`
