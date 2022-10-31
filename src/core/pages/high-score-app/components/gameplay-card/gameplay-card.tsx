import React, {useState} from "react"

import {maxClicks} from "../../library/constants"
import {LeaderboardEntry} from "../../library/types"
import {nextOrFirstLeaderboardEntry, postLeaderboardEntry} from "../../functions/leaderboard-entries"
import {useTranslation} from "../../../../../i18n/functions/use-translation"
import {translationKeys} from "../../../../../i18n/library/translation-keys"
import {FormField} from "../../../../../components/form-field/form-field"
import {Alert} from "../../../../../components/alert/alert"

import styles from "./gameplay-card.module.scss"

type Message = {
    message: string
    isError?: boolean
}

export type GameplayCardProps = {
    onNewTopTenScore?: () => void
}

export const GameplayCard = ({ onNewTopTenScore } : GameplayCardProps) => {

    const { t } = useTranslation()

    const noMessage = { message: "" }

    const [formData, setFormData] = useState<LeaderboardEntry>(nextOrFirstLeaderboardEntry())
    const [nameError, setNameError] = useState<string>("")
    const [maxClicksError, setMaxClicksError] = useState<string>("")
    const [submitMessage, setSubmitMessage] = useState<Message>(noMessage)

    const updateMessages = (name: string) => {
        if (name) {
            nameError && setNameError("")
        } else {
            !nameError && setNameError(t(translationKeys.core.provideAName))
        }
        maxClicksError && setMaxClicksError("")
        submitMessage.message && setSubmitMessage(noMessage)
    }

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const name = event.target.value
        // A name change triggers a reset
        setFormData({ name, totalPoints: 0, clicks: 0 })
        updateMessages(name)
    }

    const validateName = (name: string) => {
        updateMessages(name)
        return !!name
    }

    const updateLeaderboardThenForm = (formUpdate: LeaderboardEntry, leaderboardUpdate: LeaderboardEntry) => {
        const onSuccess = () => {
            onNewTopTenScore?.()
            setFormData(formUpdate)
            maxClicksError && setMaxClicksError("")
            setSubmitMessage({ message: t(translationKeys.core.scoreSubmitted) })
        }
        const onError = (reason: any) => {
            const arg = reason ? (t(translationKeys.core.reason) + ": " + reason) : ""
            setSubmitMessage({ message: t(translationKeys.core.submitError, arg), isError: true })
        }
        postLeaderboardEntry(leaderboardUpdate, onSuccess, onError)
    }

    const handleNext = (event: React.MouseEvent) => {
        event.preventDefault()
        if (!validateName(formData.name)) {
            return
        }
        const formDataUpdate = nextOrFirstLeaderboardEntry(formData)
        if (formDataUpdate.clicks === 0) {
            updateLeaderboardThenForm(formDataUpdate, formData)
        } else {
            const nextClickWillReset = nextOrFirstLeaderboardEntry(formDataUpdate).clicks === 0
            if (nextClickWillReset && !maxClicksError) {
                setMaxClicksError(t(translationKeys.core.maxClicksReached, maxClicks))
            } else if (!nextClickWillReset && maxClicksError) {
                setMaxClicksError("")
            }
            setFormData(formDataUpdate)
        }
    }

    const handleSubmit = (event: React.MouseEvent) => {
        event.preventDefault()
        if (!validateName(formData.name)) {
            return
        }
        updateLeaderboardThenForm(nextOrFirstLeaderboardEntry(), formData)
    }

    return (
        <section key="gameplay-card" className={styles.wrapper}>

            <span className={styles.description}>{t(translationKeys.core.gameDescription)}</span>

            <form className={styles.form}>

                <FormField name="name" label={t(translationKeys.core.name)}
                           error={nameError} errorStyleClassNames={styles.message}>
                    <input type="text" name="name" value={formData.name}
                           maxLength={125} onChange={handleNameChange}
                    />
                </FormField>
                <FormField label={t(translationKeys.core.score)}>
                    <span>{formData.totalPoints}</span>
                </FormField>
                <FormField label={t(translationKeys.core.clicksLeft)}>
                    <span>{maxClicks - formData.clicks}</span>
                </FormField>

                {maxClicksError && <Alert styleClassNames={styles.message} message={maxClicksError} isError={true} />}
                {submitMessage.message && <Alert styleClassNames={styles.message} {...submitMessage} />}

                <button onClick={handleNext}>{t(translationKeys.core.click)}</button>
                <button onClick={handleSubmit}>{t(translationKeys.core.submitScore)}</button>
            </form>
        </section>
    )
}