import { selector } from 'recoil'
import { trueKeysToArr } from '../utils/helperFunctions'
import { candidateCheckedAtom, jobCheckedAtom } from './atoms'

export const filterTrueJobChecked = selector({
	key: 'filterTrueJobChecked',
	get: ({ get }) => {
		const checkedJob = get(jobCheckedAtom)
		return trueKeysToArr(checkedJob)
	},
})

export const filterTrueCandidateChecked = selector({
	key: 'filterTrueCandidateChecked',
	get: ({ get }) => {
		const checkedCandidate = get(candidateCheckedAtom)
		return trueKeysToArr(checkedCandidate)
	},
})

