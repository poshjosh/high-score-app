import { getRandomInteger } from "./get-random-integer"
import { FetchResponse, LeaderboardEntry, RequestMethod } from "../library/types"
import { maxClicks, maxLeaderboardEntries, mockLeaderboardApiPath } from "../library/constants"
import { sendMockRequest } from "../../../../mock-api/mock-leaderboard-api"

export const computeAveragePerClick = (entry: LeaderboardEntry): number => {
    if (entry.totalPoints === 0) {
        return 0
    }
    if (entry.clicks === 0) {
        throw new Error("Positive total points may not be reached with zero clicks")
    }
    const averagePerClick = entry.totalPoints / entry.clicks
    return Math.round((averagePerClick + Number.EPSILON) * 100) / 100
}

export const postLeaderboardEntry = (
    leaderboardEntry: LeaderboardEntry, onSuccess?: () => void, onError?: (reason: any) => void
) => {
    const options = { method: RequestMethod.POST, body: leaderboardEntry }
    sendMockRequest(mockLeaderboardApiPath, JSON.stringify(options))
        .then(json => {
            const response = JSON.parse(json) as FetchResponse<boolean>
            response.code < 300 ? onSuccess?.() : onError?.(response.message)
        }).catch(reason => onError?.(reason))
}

export const nextOrFirstLeaderboardEntry = (
    entry?: LeaderboardEntry, limit: number = maxClicks
): LeaderboardEntry => {
    if (!entry || entry.clicks === limit) {
        return { name: "", totalPoints: 0, clicks: 0 }
    }
    return { name: entry.name, totalPoints: getRandomInteger() + 1, clicks: entry.clicks + 1 }
}

export const limitLeaderboardEntries = (
    entries: Array<LeaderboardEntry>, limit: number = maxLeaderboardEntries,
): Array<LeaderboardEntry> => {
    if (entries.length > limit) {
        entries.length = limit
    }
    return entries
}

export const sortLeaderboardEntries = (
    entries: Array<LeaderboardEntry>, converter: (entry: LeaderboardEntry) => number, ascending: boolean = false,
): Array<LeaderboardEntry> => {
    return entries.sort((lhs, rhs) => {
        const x = converter(lhs)
        const y = converter(rhs)
        return compare(x, y, ascending)
    })
}

const compare = (x: number, y: number, ascending: boolean = false): number => {
    const result = (x < y) ? -1 : ((x === y) ? 0 : 1)
    return ascending ? result : -result
}