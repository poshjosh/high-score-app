import { useState } from "react"

import { Leaderboard } from "./components/leader-board/leaderboard"
import { GameplayCard } from "./components/gameplay-card/gameplay-card"

import styles from "./high-score-app.module.scss"

export type HighScoreAppProps = {
    testId?: string
}

const HighScoreApp = ({ testId }: HighScoreAppProps) => {
    const [refresh, setRefresh] = useState<boolean>(false)
    return (
        <div className={styles.wrapper} data-testid={testId}>
            <Leaderboard refreshAccessor={[refresh, setRefresh]} />
            <GameplayCard onNewTopTenScore={() => setRefresh(true)} />
        </div>
    )
}

export default HighScoreApp
