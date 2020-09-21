import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import { useRecoilState } from 'recoil'

const useStyles = makeStyles({
	root: {
		flexGrow: 1,
	},
})

export default function PageTab({ atom, labels }) {
	const classes = useStyles()
	const [value, setValue] = useRecoilState(atom)

	const handleChange = (event, newValue) => {
		setValue(newValue)
	}

	const renderLabels = labels.map((item) => <Tab key={item} label={item} />)
	return (
		<Tabs
			value={value}
			onChange={handleChange}
			indicatorColor='primary'
			textColor='primary'
			centered>
			{renderLabels}
		</Tabs>
	)
}
