// Even though we have types here they are just for internal checks.
// None of these types exposed, to reduce coupling

enum RequestMethod { GET = "GET", POST = "POST" }

interface RequestOptions {
    method: RequestMethod
    body?: LeaderboardEntry,
}

interface LeaderboardEntry {
    name: string
    totalPoints: number
    clicks: number
}

interface Response {
    code: number
    message: string
    body?: Array<LeaderboardEntry> | boolean
}

export const sendMockRequest = (url: string, options: string): Promise<string> => {
    let responseString;
    try {
        const requestOptions: RequestOptions = JSON.parse(options) as RequestOptions
        responseString = handleRequest(url, requestOptions)
    } catch (error) {
        responseString = newResponse(500, "Error")
    }
    return Promise.resolve(responseString)
}

export const handleRequest = (url: string, requestOptions: RequestOptions): string => {
    if (url !== "mock-leaderboard-entries") {
        return newResponse(404, "Not found")
    }
    switch(requestOptions.method) {
        case RequestMethod.POST:
            return postLeaderboardEntry(requestOptions?.body)
        case RequestMethod.GET:
            return getLeaderboardEntries()
        default:
            return newResponse(405, "Method not supported: " + requestOptions.method)
    }
}

const postLeaderboardEntry = (newEntry?: LeaderboardEntry): string => {
    if (!newEntry) {
        return newResponse(400, "Nothing to post")
    }
    const errorField = validateLeaderboardEntry(newEntry)
    if (errorField) {
        return newResponse(400, "Invalid " + errorField)
    }
    const entries: Array<LeaderboardEntry> = getLeaderboardEntriesFromLocalStorage()
    const existing = entries.find(entry => entry.name === newEntry.name)
    if (existing) {
        existing.clicks = newEntry.clicks
        existing.totalPoints = newEntry.totalPoints
    } else {
        entries.push(newEntry)
    }
    saveLeaderboardEntriesToLocalStorage(entries)
    // We could find out if the new entry is top 'N' on the leaderboard, by sorting.
    // However, since it is not required at this location, we chose to omit that logic.
    // We only use this variable for testing purposes, by manually toggling the value.
    const isNewEntryTopOfLeaderboard = true
    return newResponse(201, "Created", isNewEntryTopOfLeaderboard)
}

const validateLeaderboardEntry = (leaderboardEntry: LeaderboardEntry): string | undefined => {
    if (!leaderboardEntry.name) {
        return "name"
    }
}

const getLeaderboardEntries = (): string => {
    return newResponse(200, "Success", getLeaderboardEntriesFromLocalStorage())
}

const newResponse = (code: number, message: string, body?: Array<LeaderboardEntry> | boolean): string => {
    const response: Response = { code, message, body } as Response
    return JSON.stringify(response)
}

const key = "mock-leaderboard-api.entries"
const getLeaderboardEntriesFromLocalStorage = (): Array<LeaderboardEntry> => {
    const value = localStorage.getItem(key)
    if (!value) {
        return []
    }
    return JSON.parse(value) as Array<LeaderboardEntry>
}

const saveLeaderboardEntriesToLocalStorage = (entries: Array<LeaderboardEntry>): boolean => {
    if (entries) {
        localStorage.setItem(key, JSON.stringify(entries))
        return true
    } else {
        return false
    }
}

const saveDefaultLeaderboardEntries = () => {
    if (getLeaderboardEntriesFromLocalStorage().length === 0) {
        const defaultLeaderboardEntries: Array<LeaderboardEntry> = [
            {name: "Jane Doe", totalPoints: 157, clicks: 5},
            {name: "Lily Allen", totalPoints: 234, clicks: 8},
            {name: "John Smith", totalPoints: 390, clicks: 10}
        ]
        saveLeaderboardEntriesToLocalStorage(defaultLeaderboardEntries)
    }
}

saveDefaultLeaderboardEntries()
