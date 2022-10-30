import { Link } from "react-router-dom"

import { ErrorMessage } from "../../../components/error-message/error-message"
import { translationKeys } from "../../../i18n/library/translation-keys"
import { useTranslation } from "../../../i18n/functions/use-translation"

import styles from "./not-found.module.scss"

const NotFound = () => {
	const { t } = useTranslation()
	return (
		<div className={styles.wrapper}>
			<ErrorMessage message={t(translationKeys.error.pageNotFound)} />
			<div className={styles.linkWrapper}>
				<Link to="/" className={styles.action}>{t(translationKeys.error.browseToHome)}</Link>
			</div>
		</div>
	)
}
export default NotFound
