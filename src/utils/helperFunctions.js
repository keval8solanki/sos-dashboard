import React from 'react'
import Loader from '../components/Loader'
import { ItemList } from '../styles'

export const codeGenerator = (field1, field2, field3) => {
	//Helper Function
	const abbreviator = (str, limit) => {
		const strArr = str.split(' ')
		if (strArr.length === 1) {
			return str.substring(0, limit).toUpperCase()
		} else {
			let code = ''
			for (let letter of strArr) {
				code += letter[0]
			}
			return code.substring(0, limit).toUpperCase()
		}
	}

	const charCode = (str) => {
		console.log(str)
		let codeDigit = 0
		for (let i = 0; i < str.length; i++) {
			codeDigit += str.charCodeAt(i) - 64
		}
		return codeDigit
	}

	// Converting full string to short form
	const compressedFields = [
		abbreviator(field1, 2),
		abbreviator(field2, 2),
		abbreviator(field3, 2),
	].join('')

	// Char code of field
	const charCodeLeft = charCode(field1)
	const charCodeRight = charCode(field2)

	return `${compressedFields}${charCodeLeft}${charCodeRight}`
}

export const addValToArr = (e, val, data, setData) => {
	e.preventDefault()
	if (!data.includes(val)) {
		const tempData = [...data]
		tempData.push(val)
		setData(tempData)
	}
}

const removeValFromArr = (item, data, setData) => {
	let dataTemp = [...data]
	dataTemp = dataTemp.filter((val) => val !== item)
	console.log(dataTemp)
	setData(dataTemp)
}

export const renderArr = (data, setData) =>
	data.map((item) => (
		<ItemList onClick={() => removeValFromArr(item, data, setData)} key={item}>
			{item} X
		</ItemList>
	))

export const trueKeysToArr = (obj) => {
	const ids = Object.keys(obj)
	return ids.filter((id) => obj[id])
}

export const titleGenerator = (arr, title) => {
	const count = arr.length
	if (count > 0) {
		return `${count} Selected`
	} else {
		return title
	}
}

export const renderWithLoader = (val, component) =>val ? component : <Loader />
