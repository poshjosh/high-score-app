import { maxScore, minScore } from "../library/constants"

/**
 * Return a random integer between min (inclusive) and max (exclusive)
 * @param min The minimum integer
 * @param max The maximum integer
 */
export const getRandomInteger = (min: number = minScore, max: number = maxScore) => {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min) + min)
}
