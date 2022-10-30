import styles from "./error-message.module.scss"

export type ErrorMessageProps = {
	message?: string
	testId?: string
}

export const ErrorMessage = ({ message, testId }: ErrorMessageProps) => {
	return message ? <div className={styles.error} data-testid={testId}>{message}</div> : null
}
