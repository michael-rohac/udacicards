/**
 * © 2017 Michal Rohac, All Rights Reserved.
 */
export const LOGGER_TRACE = 0
export const LOGGER_DEBUG = 1
export const LOGGER_INFO = 2
export const LOGGER_ERROR = 3
export const LOGGER_OFF = 4

const doNothing = () => {}

export function LogerFactory(LOGGER_LEVEL = LOGGER_ERROR) {
    return {
        trace: LOGGER_LEVEL <= LOGGER_TRACE ? (console.debug || console.log) : doNothing,
        debug: LOGGER_LEVEL <= LOGGER_DEBUG ? (console.debug || console.log) : doNothing,
        info: LOGGER_LEVEL <= LOGGER_INFO ? console.log : doNothing,
        error: LOGGER_LEVEL <= LOGGER_ERROR ? (console.error || console.log) : doNothing
    }
}
