import { joinClassNames } from "../utils/functions/join-class-names"

import styles from "./alert.module.scss"

export type ErrorMessageProps = {
	message?: string
	styleClassNames?: string
	isError?: boolean
	testId?: string
}

export const Alert = ({ message, styleClassNames, isError, testId }: ErrorMessageProps) => {
	if (!message) {
		return null
	}
	const className = isError ? styles.messageError : styles.messageSuccess
	return (
		<div className={joinClassNames(styles.message, className, styleClassNames)} data-testid={testId}>
			{message}
		</div>
	)
}
