import React from "react"
import { fireEvent, render, waitFor} from "@testing-library/react"

import { GameplayCard } from "./gameplay-card"
import { useTranslation } from "../../../../../i18n/functions/use-translation"
import { translationKeys } from "../../../../../i18n/library/translation-keys"

it("Renders the gameplay card", () => {
    const { t } = useTranslation()
    const { getByText } = render(<GameplayCard key="gameplay-card" />)
    expect(getByText(t(translationKeys.core.gameDescription) as any)).toBeInTheDocument()
})

it("Displays appropriate error message, on submit without name input", () => {
    const { t } = useTranslation()
    const { getByText } = render(<GameplayCard key="gameplay-card" />)

    const elementHavingText = (key : string): HTMLElement => getByText(t(key) as any)

    fireEvent.click(elementHavingText(translationKeys.core.submitScore))

    waitFor(() => elementHavingText(translationKeys.core.submitError))
        .then(() => expect(elementHavingText(translationKeys.core.submitError)).toBeInTheDocument())
})
