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
    text: string
    isError?: boolean
}

export type GameplayCardProps = {
    onNewTopTenScore?: () => void
}

export const GameplayCard = ({ onNewTopTenScore } : GameplayCardProps) => {

    const { t } = useTranslation()

    const [formData, setFormData] = useState<LeaderboardEntry>(nextOrFirstLeaderboardEntry())
    const [nameError, setNameError] = useState<string>("")
    const [maxClicksError, setMaxClicksError] = useState<string>("")
    const [submitMessage, setSubmitMessage] = useState<Message>({ text: "" })

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault()

        // A name change triggers a reset
        setFormData({ name: event.target.value, totalPoints: 0, clicks: 0 })

        setSubmitMessage({ text: "" })
    }

    const validateName = (name: string) => {
        if (name && nameError) {
            setNameError("")
        } else if (!name && !nameError) {
            setNameError(t(translationKeys.core.provideAName))
        }
        return !!name
    }

    const handleNameBlur = (event: React.FocusEvent<HTMLInputElement>) => {
        event.preventDefault()
        validateName(event.target.value)
    }

    const updateLeaderboardThenForm = (formUpdate: LeaderboardEntry, leaderboardUpdate: LeaderboardEntry) => {
        const onSuccess = () => {
            onNewTopTenScore?.()
            setFormData(formUpdate)
            maxClicksError && setMaxClicksError("")
            setSubmitMessage({ text: t(translationKeys.core.scoreSubmitted) })
        }
        const onError = (reason: any) => {
            const arg = reason ? (t(translationKeys.core.reason) + ": " + reason) : ""
            setSubmitMessage({ text: t(translationKeys.core.submitError, arg), isError: true })
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
                    <input type="text" name="name" value={formData.name} maxLength={125}
                           onChange={handleNameChange} onBlur={handleNameBlur}
                    />
                </FormField>
                <FormField label={t(translationKeys.core.score)}>
                    <span>{formData.totalPoints}</span>
                </FormField>
                <FormField label={t(translationKeys.core.clicksLeft)}>
                    <span>{maxClicks - formData.clicks}</span>
                </FormField>

                {maxClicksError && <Alert styleClassNames={styles.message} message={maxClicksError} isError={true} />}
                {submitMessage.text && <Alert styleClassNames={styles.message} message={submitMessage.text} isError={submitMessage.isError} />}

                <button onClick={handleNext}>{t(translationKeys.core.newScore)}</button>
                <button type="submit" onClick={handleSubmit}>{t(translationKeys.core.submitScore)}</button>
            </form>
        </section>
    )
}