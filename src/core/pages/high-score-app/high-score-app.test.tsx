import React from "react"
import { act, render, waitFor } from "@testing-library/react"

import HighScoreApp from "./high-score-app"

it("Renders HighScoreApp", async () => {
    const testId = "high-score-app-fake-test-id"
    let elementSelector: any
    await act(async () => {
        const { getByTestId } = render(<HighScoreApp testId={testId}/>)
        elementSelector = getByTestId
    })
    waitFor(() => elementSelector(testId))
        .then(() => expect(elementSelector(testId)).toBeInTheDocument())
})
