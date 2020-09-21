import styled, { css } from 'styled-components'
import { NavLink } from 'react-router-dom'
import {
	Button,
	InputLabel,
	MenuItem,
	Select,
	TextField,
} from '@material-ui/core'

export const RemoveSpaces = css`
	margin: 0px;
	padding: 0px;
`

export const themeBorder = css`
	border: 1px solid #0000003b;
	border-radius: 6px;
`

export const MultipleItemInputContainer = styled.form`
	display: flex;
	align-items: center;
	width: 100%;
`

export const Card = styled.div`
	padding: 10px 20px;
	border-radius: 3px;
	border: 1px solid #0000003b;
	background-color: white;
	margin-bottom: 10px;
`

export const StyledNavlink = styled(NavLink)`
	width: 150px;
	padding: 6px 10px;
	border-radius: 0.25rem;
	display: flex;
	align-items: center;
	color: black;
	text-decoration: none;
	font-weight: 400;
	&:focus {
		color: black;
	}
	&:hover {
		color: black;
	}
`

export const TableRow = styled.tr`
	/* cursor: pointer; */
	transition: all 0.5s;
	&:hover {
		background-color: #eef0f7;
	}
`

export const TableData = styled.td`
	border: 0;
	font-size: 0.9em;

	text-align: left;
	padding: 4px;

	border-bottom: 1px solid #00000021;
`

export const TableHead = styled.th`
	border: 0;
	font-size: 0.9em;

	text-align: left;
	padding: 4px;

	border-bottom: 1px solid #00000021;
	color: #000000c2;
`
export const PageLayout = styled.div`
	/* width: 100%; */
	padding: 10px;
`

export const InputContainer = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	align-items: flex-start;
`

export const CategoryContainer = styled.div``

export const CategoryTitle = styled.h3`
	${RemoveSpaces};
`

export const Label = styled.label``

export const StyledTextField = styled(TextField)`
	width: 100%;
	margin: 10px;
`

export const ItemListContainer = styled.ul`
	list-style: none;
	padding: 0;
	margin: 0;
	display: flex;
	padding: 10px;
	border: 1px dashed #0000003b;
	background-color: #0000000d;
	border-radius: 6px;
	margin: 20px 0px;
	flex-flow: wrap;
`

export const ItemList = styled.li`
	margin: 5px;
	padding: 5px 10px;
	border-radius: 6px;
	background-color: white;
	border: 1px solid #0000003b;
`
export const DataTitle = styled.h5`
	text-align: left;
	${RemoveSpaces};
`

export const DataContent = styled.p`
	${RemoveSpaces};
	text-align: left;
`

export const ContentContainer = styled.div`
	padding: 10px;
`
