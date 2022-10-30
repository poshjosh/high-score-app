import { FC } from "react"

import { joinClassNames } from "../utils/functions/join-class-names"

import styles from "./loading-spinner.module.scss"

export enum LoadingSpinnerSize {
	Small = "Small",
	Medium = "Medium",
	Large = "Large",
}

export type LoadingSpinnerProps = {
	size?: LoadingSpinnerSize
	styleClassNames?: string
	testId?: string
}

export const LoadingSpinner: FC<LoadingSpinnerProps> = ({
	size = LoadingSpinnerSize.Large,
	styleClassNames,
	testId = "loading-spinner",
}) => {
	const sizeProportionMap: Record<LoadingSpinnerSize, number> = {
		[LoadingSpinnerSize.Small]: 1,
		[LoadingSpinnerSize.Medium]: 1.5,
		[LoadingSpinnerSize.Large]: 2,
	}
	const styleProps = {
		borderWidth: `max(${sizeProportionMap[size] * 0.1}rem, 2px)`,
	}
	const loadingSpinnerSize = styles["loadingSpinner" + size]
	return (
		<div className={joinClassNames(styles.loadingSpinner, loadingSpinnerSize, styleClassNames)} data-testid={testId}>
			{Array.from<string>({ length: 3 }).map((value, index) => (
				<div key={index} style={styleProps} className={loadingSpinnerSize} />
			))}
		</div>
	)
}
