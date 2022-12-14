import { Link } from "react-router-dom"

import { Alert } from "../../../components/alert/alert"
import { translationKeys } from "../../../i18n/library/translation-keys"
import { useTranslation } from "../../../i18n/functions/use-translation"

import styles from "./not-found.module.scss"

const NotFound = () => {
	const { t } = useTranslation()
	return (
		<div className={styles.wrapper}>
			<Alert message={t(translationKeys.error.pageNotFound)} isError={true} />
			<div className={styles.linkWrapper}>
				<Link to="/" className={styles.action}>{t(translationKeys.error.browseToHome)}</Link>
			</div>
		</div>
	)
}
export default NotFound
