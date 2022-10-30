import { useEffect, useRef, useState } from "react"

import {
    FetchResponse,
    FetchResult,
    FetchStatus,
    RequestMethod,
} from "../library/types"
import { mockLeaderboardApiPath } from "../library/constants"
import { sendMockRequest } from "../../../../mock-api/mock-leaderboard-api"

function useCustomFetch<T>(
    responseBodyTransformer?: (responseBody: T) => T,
    ignoreCache?: boolean
): FetchResult<T> {

    const cachedResponse = useRef<FetchResponse<T>>()

    const [fetchResult, setFetchResult] = useState<FetchResult<T>>({ status: FetchStatus.Idle })

    useEffect(() => {

        let cleanUp = false

        const fetchWithStatus = async (): Promise<FetchResponse<T> | undefined> => {
            if (cleanUp) {
                return Promise.resolve(undefined)
            }
            setFetchResult({ status: FetchStatus.Fetching })
            if (!ignoreCache && cachedResponse.current) {
                return Promise.resolve(cachedResponse.current)
            } else {
                const requestOptions = { method: RequestMethod.GET }
                return sendMockRequest(mockLeaderboardApiPath, JSON.stringify(requestOptions))
                    .then(json => {
                        const response = JSON.parse(json) as FetchResponse<T>
                        if (responseBodyTransformer && response.body) {
                            response.body = responseBodyTransformer(response.body)
                        }
                        cachedResponse.current = response
                        return response
                    })
            }
        };

        fetchWithStatus()
            .then(response => {
                if (cleanUp) {
                    return
                }
                setFetchResult({ status: FetchStatus.Fetched, response })
            })

        return () => {
            cleanUp = true
        }

    }, [ignoreCache])

    return fetchResult
}

export default useCustomFetch
