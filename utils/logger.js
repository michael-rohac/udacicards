/**
 * © 2017 Michal Rohac, All Rights Reserved.
 */
export const LOGGER_TRACE = 0
export const LOGGER_DEBUG = 1
export const LOGGER_INFO = 2
export const LOGGER_ERROR = 3

// true disable logging using this logger completely
export const LOGGER_OFF = true

const doNothing = () => {}

function _getLoggerFunctionFor(loggerTypeLevel, loggerLevel) {
    if (LOGGER_OFF) return doNothing
    switch (loggerTypeLevel) {
        case LOGGER_TRACE:
            return console.debug || console.log
        case LOGGER_DEBUG:
            return console.debug || console.log
        case LOGGER_INFO:
            return console.log
        case LOGGER_ERROR:
            return console.error || console.log
        default:
            return doNothing
    }
}

export function LogerFactory(LOGGER_LEVEL = LOGGER_ERROR) {
    return {
        trace: _getLoggerFunctionFor(LOGGER_TRACE, LOGGER_LEVEL),
        debug: _getLoggerFunctionFor(LOGGER_DEBUG, LOGGER_LEVEL),
        info: _getLoggerFunctionFor(LOGGER_INFO, LOGGER_LEVEL),
        error: _getLoggerFunctionFor(LOGGER_ERROR, LOGGER_LEVEL),
    }
}
