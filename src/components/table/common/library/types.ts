import { Key, TableHTMLAttributes } from "react"

export type TableRowType = {
	key?: Key
	values: Array<string | number>
}

export type TableColumnType = {
	title: string
	flex?: number
	align?: AlignType
	key?: Key
}

export type TableProps<T extends TableRowType> = {
	columns: TableColumnType[]
	data: T[]
} & TableHTMLAttributes<TableRowType>

export enum AlignType {
	Left = "left",
	Center = "center",
	Right = "right",
}
