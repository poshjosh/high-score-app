import { AlignType, TableRowType, TableColumnType, TableProps } from "./common/library/types"
import { joinClassNames } from "../utils/functions/join-class-names"

import styles from "./table.module.scss"

const stylesAlignMap = {
	[AlignType.Left]: styles.alignLeft,
	[AlignType.Right]: styles.alignRight,
	[AlignType.Center]: undefined,
}

export const Table = <T extends TableRowType>({ columns, data }: TableProps<T>) => {
	const getCellClassNames = (align: AlignType = AlignType.Center) => joinClassNames(styles.cell, stylesAlignMap[align])
	const getCellStyles = (column: TableColumnType) => ({ flex: column.flex || 1 })

	return (
		<table className={styles.table}>
			<thead>
				<tr className={styles.header}>
					{columns.map(column => (
						<th key={column.key} className={getCellClassNames(column.align)} style={getCellStyles(column)}>
							<span className={styles.title}>{column.title}</span>
						</th>
					))}
				</tr>
			</thead>
			<tbody className={styles.body}>
				{data.map(row => (
					<tr key={row.key} className={styles.row}>
						{columns.map((column, columnIndex) => (
							<td key={columnIndex} className={getCellClassNames(column.align)} style={getCellStyles(column)}>
								{row.values[columnIndex]}
							</td>
						))}
					</tr>
				))}
			</tbody>
		</table>
	)
}
