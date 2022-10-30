import React, {Dispatch, SetStateAction, useEffect, useState} from "react"

import {FetchStatus, LeaderboardEntry} from "../../library/types"
import {limitLeaderboardEntries, sortLeaderboardEntries} from "../../functions/leaderboard-entries"
import useCustomFetch from "../../functions/use-custom-fetch"
import {Table} from "../../../../../components/table/table"
import {AlignType, TableRowType} from "../../../../../components/table/common/library/types"
import {translationKeys} from "../../../../../i18n/library/translation-keys"
import {LoadingSpinner} from "../../../../../components/loading-spinner/loading-spinner"
import {useTranslation} from "../../../../../i18n/functions/use-translation"
import {Label} from "../../../../../components/label/label"

import styles from "./leaderboard.module.scss"

export type LeaderboardProps = {
    refreshAccessor: [boolean, Dispatch<SetStateAction<boolean>>]
}

export const Leaderboard = ({ refreshAccessor } : LeaderboardProps) => {
    console.log("" + new Date() +  "Leaderboard")
    const { t } = useTranslation()

    const sortByAverage = "sort-by-average"
    const sortOptions = [
        { value: "sort-by-total", text: t(translationKeys.core.totalPoints) },
        { value: sortByAverage, text: t(translationKeys.core.averagePointsPerClick) },
    ]

    const [ refresh, setRefresh ] = refreshAccessor
    const [ selectedSortOptionValue, setSelectedSortOptionValue] = useState<string>(sortOptions[0].value)

    const getEntryValueForSorting = (entry: LeaderboardEntry) => {
        return sortByAverage === selectedSortOptionValue ? entry.totalPoints / entry.clicks : entry.totalPoints
    }

    const sortThenLimitEntries = (entries: Array<LeaderboardEntry>) => {
        return limitLeaderboardEntries(sortLeaderboardEntries(entries, getEntryValueForSorting))
    }

    const { status, response } = useCustomFetch<Array<LeaderboardEntry>>(
        responseBody => sortThenLimitEntries(responseBody),
        refresh
    )

    useEffect(() => {
        if (refresh) setRefresh(false)
    }, [refresh, setRefresh])

    const { name, score, numberOfClicks } = translationKeys.core
    const columns = [ name, score, numberOfClicks ].map((columnName, index) => {
        const alignType = columnName === name ? AlignType.Left : AlignType.Right
        return { key: "leaderboard-column-" + index, title: columnName, align: alignType }
    })

    const tableData: Array<TableRowType> = []
    response?.body?.forEach((entry: LeaderboardEntry, index: number) => {
        const { name, totalPoints, clicks } = entry
        tableData.push({ key: "leaderboard-row-" + index, values: [ name, totalPoints, clicks], })
    })

    const handleSortOptionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        event.preventDefault()
        setSelectedSortOptionValue(event.target.value)
        setRefresh(true)
    }

    return (
        <section key="leaderboard">
            {
                status === FetchStatus.Fetching
                ? <LoadingSpinner />
                : (
                     <>
                         <header className={styles.header}>
                             {t(translationKeys.core.leaderboardTitle)}
                         </header>
                         <Label name="sort-by" label={t(translationKeys.core.sortBy)}>
                             <select
                                 className={styles.select}
                                 name="sort-by" value={selectedSortOptionValue}
                                 onChange={handleSortOptionChange}>
                                 {sortOptions.map((sortOption) => {
                                     return (
                                         <option key={sortOption.value} value={sortOption.value}>
                                             {sortOption.text}
                                         </option>
                                     )
                                 })}
                             </select>
                         </Label>
                         <Table columns={columns} data={tableData} />
                     </>
                 )
            }
        </section>
    )
}