import styled from 'styled-components'
import { Button, FormControl, Select, TextField } from '@material-ui/core'

export const SMUIButton = styled(Button)`
	&& {
		/* background-color: red; */
	}
`
export const SMUITextField = styled(TextField)`
	&& {
		margin: 10px 0px;
		width: 100%;
	}
`
export const SMUISelect = styled(Select)`
	&& {
		width: 100%;
		margin: 10px 0px;
		padding: 5px 0px;

		text-align: left;
	}
`
export const SMUIFormControl = styled(FormControl)`
	&& {
		width: 100%;
		/* margin: 10px 0px; */
		text-align: left;
	}
`
