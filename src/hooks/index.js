import { useEffect } from 'react'
import Axios from 'axios'
import { useRecoilState } from 'recoil'

export const useFetchData = (uri, atom) => {
	const [data, setData] = useRecoilState(atom)
	useEffect(() => {
		Axios.get(uri)
			.then(({ data }) => setData(data))
			.catch((e) => console.log(e))
	}, [])
}
