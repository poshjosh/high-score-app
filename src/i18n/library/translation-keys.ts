import {maxClicks, maxScore} from "../../core/pages/high-score-app/library/constants";

export const error = {
    fallbackMessage: "An unexpected error occurred",
    pageNotFound: "The requested could not be found",
    browseToHome: "Browse home",
}

export const core = {
    name: "Name",
    score: "Score",
    numberOfClicks: "Number of clicks",
    clicksLeft: "Clicks left",
    newScore: "New score",
    submitScore: "Submit score",
    provideAName: "Please provide a name",
    sortBy: "Sort by",
    totalPoints: "Total points",
    averagePointsPerClick: "Average points per click",
    submitError: "Failed to submit. %s",
    reason: "Reason",
    maxClicksReached: "You reached the maximum of %s clicks. The next click will submit your score",
    leaderboardTitle: "Leaderboard",
    gameDescription: `You have ${maxClicks} clicks to reach a maximum score of ${maxScore}`,
}

export const translationKeys = {
    error, core,
}


