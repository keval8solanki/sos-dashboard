import { atom, selector } from 'recoil'
import { trueKeysToArr } from '../utils/helperFunctions'

export const jobAtom = atom({
	key: 'jobs',
	default: null,
})

export const candidateAtom = atom({
	key: 'candidates',
	default: null,
})

export const jobCheckedAtom = atom({
	key: 'jobChecked',
	default: {},
})

export const candidateCheckedAtom = atom({
	key: 'candidateChecked',
	default: {},
})

export const jobTab = atom({
	key: 'jobTab',
	default: 0,
})

export const candidateTab = atom({
	key: 'candidateTab',
	default: 0,
})

export const credentialAtom = atom({
	key: 'cred',
	default: { email: '', password: '' },
})

export const isAuthAtom = atom({
	key: 'isAuth',
	default: false
})