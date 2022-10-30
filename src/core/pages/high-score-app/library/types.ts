export enum RequestMethod { GET = "GET", POST = "POST" }

export type RequestOptions = {
    method: RequestMethod
    body?: string,
}

export enum FetchStatus {
    Idle = "Idle",
    Fetching = "Fetching",
    Fetched = "Fetched",
}

export type FetchResponse<T> = {
    code: number,
    message: string,
    body?: T,
}

export type FetchResult<T> = {
    status: FetchStatus,
    response?: FetchResponse<T>
}

export type LeaderboardEntry = {
    name: string
    totalPoints: number
    clicks: number
}