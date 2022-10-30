import React, { lazy, Suspense } from "react"
import { Route, Routes } from "react-router"

import { LoadingSpinner } from "../components/loading-spinner/loading-spinner"
import ErrorBoundary from "../components/error-boundary/error-boundary"
import { useTranslation } from "../i18n/functions/use-translation"
import { translationKeys } from "../i18n/library/translation-keys"

const HighScoreApp = lazy(async () => import("./pages/high-score-app/high-score-app"))
const NotFound = lazy(async () => import("./pages/not-found/not-found"))

const AppRoutes = () => {
    const { t } = useTranslation()
    const errorMessage = t(translationKeys.error.fallbackMessage)
    return (
        <Suspense fallback={<LoadingSpinner />}>
            <Routes>
                <Route path="/" element={<ErrorBoundary errorMessage={errorMessage}><HighScoreApp /></ErrorBoundary>} />
                <Route path="*" element={<ErrorBoundary errorMessage={errorMessage}><NotFound /></ErrorBoundary>} />
            </Routes>
        </Suspense>
    )
}

export default AppRoutes
