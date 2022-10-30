import React, {useState} from "react"

import {maxClicks} from "../../library/constants"
import {LeaderboardEntry} from "../../library/types"
import {nextOrFirstLeaderboardEntry, postLeaderboardEntry} from "../../functions/leaderboard-entries"
import {useTranslation} from "../../../../../i18n/functions/use-translation"
import {translationKeys} from "../../../../../i18n/library/translation-keys"
import {FormField} from "../../../../../components/form-field/form-field"
import {ErrorMessage} from "../../../../../components/error-message/error-message"

import styles from "./gameplay-card.module.scss"

export type GameplayCardProps = {
    onNewTopTenScore?: () => void
}

export const GameplayCard = ({ onNewTopTenScore } : GameplayCardProps) => {
    console.log("" + new Date() +  "GameplayCard")
    const { t } = useTranslation()

    const [formData, setFormData] = useState<LeaderboardEntry>(nextOrFirstLeaderboardEntry())
    const [nameError, setNameError] = useState<string>("")
    const [maxClicksError, setMaxClicksError] = useState<string>("")
    const [submitError, setSubmitError] = useState<string>("")

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault()
        setFormData(
            { name: event.target.value, totalPoints: formData.totalPoints, clicks: formData.clicks }
        )
        submitError && setSubmitError("")
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
            submitError && setSubmitError("")
        }
        const onError = (reason: any) => {
            const arg = reason ? (t(translationKeys.core.reason) + ": " + reason) : ""
            submitError || setSubmitError(t(translationKeys.core.submitError, arg))
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
            updateLeaderboardThenForm(formDataUpdate, formDataUpdate)
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

                <FormField name="name" label={t(translationKeys.core.name)} error={nameError}>
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

                {maxClicksError && <ErrorMessage message={maxClicksError} />}
                {submitError && <ErrorMessage message={submitError} />}

                <button onClick={handleNext}>{t(translationKeys.core.newScore)}</button>
                <button type="submit" onClick={handleSubmit}>{t(translationKeys.core.submitScore)}</button>
            </form>
        </section>
    )
}