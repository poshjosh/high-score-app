import { useEffect, useRef, useState } from "react"

import {
    FetchResponse,
    FetchResult,
    FetchStatus,
    RequestMethod,
    RequestOptions,
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

        const update = (fetchResult: FetchResult<T>): boolean => {
            if (cleanUp) {
                return false
            }
            setFetchResult(fetchResult)
            return true
        }

        const fetchThenUpdateResult = () => {
            if (!update({ status: FetchStatus.Fetching })) {
                return
            }
            if (!ignoreCache && cachedResponse.current) {
                if (!update({ status: FetchStatus.Fetched, response: cachedResponse.current })) {
                    return
                }
            }

            const requestOptions: RequestOptions = { method: RequestMethod.GET }
            sendMockRequest(mockLeaderboardApiPath, JSON.stringify(requestOptions))
                .then(json => {
                    const response = JSON.parse(json) as FetchResponse<T>
                    if (responseBodyTransformer && response.body) {
                        response.body = responseBodyTransformer(response.body)
                    }
                    cachedResponse.current = response
                    update({ status: FetchStatus.Fetched, response })
                }).catch(reason => {
                    const error = reason && JSON.parse(reason)
                    update({ status: FetchStatus.Error, error })
                })
        };

        fetchThenUpdateResult()

        return () => {
            cleanUp = true
        }

    }, [ignoreCache])

    return fetchResult
}

export default useCustomFetch
