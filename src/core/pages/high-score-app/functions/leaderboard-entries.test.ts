import {
    limitLeaderboardEntries,
    nextOrFirstLeaderboardEntry,
    sortLeaderboardEntries
} from "./leaderboard-entries"

it("Returns next leaderboard entry, given first leaderboard entry", () => {
    const name = "test-name"
    const clicks = 0
    const nextEntry = nextOrFirstLeaderboardEntry({ name, clicks, totalPoints: 0 })
    expect(nextEntry.name).toEqual(name)
    expect(nextEntry.clicks).toBe(clicks + 1)

})

it("Returns first leaderboard entry, given last leaderboard entry", () => {
    const name = "test-name"
    const limit = 3
    const nextEntry = nextOrFirstLeaderboardEntry({ name, clicks: limit, totalPoints: 1 }, limit)
    expect(nextEntry.name).toEqual("")
    expect(nextEntry.clicks).toBe(0)
    expect(nextEntry.totalPoints).toBe(0)
})

it("Limits the number of leaderboard entries to the specified positive integer", () => {
    const entries = [
        { name: "test-name-1", clicks: 1, totalPoints: 1 },
        { name: "test-name-2", clicks: 2, totalPoints: 2 },
        { name: "test-name-3", clicks: 3, totalPoints: 3 },
    ]
    const newLength = entries.length - 1
    const result = limitLeaderboardEntries(entries, newLength)
    expect(result.length).toBe(newLength)
})

it("Sorts the leaderboard entries by total points", () => {
    const entries = [
        { name: "test-name-2", clicks: 2, totalPoints: 2 },
        { name: "test-name-1", clicks: 1, totalPoints: 1 },
        { name: "test-name-3", clicks: 3, totalPoints: 3 },
    ]
    const result = sortLeaderboardEntries(entries, entry => entry.totalPoints)
    expect(result[0].totalPoints).toBe(3)
    expect(result[2].totalPoints).toBe(1)
})

it("Sorts the leaderboard entries by average points", () => {
    const entries = [
        { name: "test-name-2", clicks: 2, totalPoints: 200 },
        { name: "test-name-1", clicks: 1, totalPoints: 10 },
        { name: "test-name-3", clicks: 3, totalPoints: 3000 },
    ]
    const result = sortLeaderboardEntries(entries, entry => entry.totalPoints / entry.clicks)
    expect(result[0].totalPoints).toBe(3000)
    expect(result[2].totalPoints).toBe(10)
})
