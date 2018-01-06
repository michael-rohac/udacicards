/**
 * © 2017 Michal Rohac, All Rights Reserved.
 */
import {AsyncStorage} from 'react-native'
import {Notifications, Permissions} from 'expo'
import initialData from './initialData'
import {LogerFactory, LOGGER_DEBUG} from './logger'

export const APP_STORAGE_KEY = 'UdaciCards:ReduxState'
const APP_NOTIFICATION_KEY = 'UdaciCards:notifications'

const logger = LogerFactory(LOGGER_DEBUG)

export function nameToId(name) {
    if (!name || typeof name !== 'string') return name;
    return name.toLowerCase().replace(/\s+/g, "_");
}

export function removeReduxStateFromAsyncStorage() {
    logger.debug("About to call removeReduxStateFromAsyncStorage()")
    return AsyncStorage.removeItem(APP_STORAGE_KEY)
        .then(data => {
            logger.debug("SUCCESS: AsyncStorage.removeItem", data)
            return data
        })
        .catch((error) => {
            logger.error("FAIL: AsyncStorage.removeItem", error)
        })
}

export function syncReduxStateWithAsyncStorage(state) {
    logger.debug("About to call syncReduxStateWithAsyncStorage()")
    return AsyncStorage.mergeItem(APP_STORAGE_KEY, JSON.stringify(state))
        .then(data => {
            logger.debug("SUCCESS: AsyncStorage.mergeItem", data)
            return data
        })
        .catch((error) => {
            logger.error("FAIL: AsyncStorage.mergeItem", error)
        })
}

export function getReduxStateFromAsyncStorage() {
    logger.debug("About to call getReduxStateFromAsyncStorage()")
    return AsyncStorage.getItem(APP_STORAGE_KEY)
        .then((data) => {
            logger.debug("SUCCESS: AsyncStorage.getItem", data)
            return data ? JSON.parse(data) : initialData
        })
        .catch((error) => {
            logger.error("FAIL: AsyncStorage.getItem", error)
        })
}

export function clearLocalNotification() {
    return AsyncStorage.removeItem(APP_NOTIFICATION_KEY)
        .then(Notifications.cancelAllScheduledNotificationsAsync)
}

function createNotification() {
    return {
        title: 'Take some quiz!',
        body: "👋 Don't forget to learn something new today!",
        android: {
            sound: true,
            priority: 'high',
            sticky: false,
            vibrate: true,
        }
    }
}

export function setLocalNotification() {
    AsyncStorage.getItem(APP_NOTIFICATION_KEY)
        .then(JSON.parse)
        .then((data) => {
            if (data === null) {
                Permissions.askAsync(Permissions.NOTIFICATIONS)
                    .then(({status}) => {
                        if (status === 'granted') {
                            Notifications.cancelAllScheduledNotificationsAsync()
                            let tomorrow = new Date()
                            tomorrow.setDate(tomorrow.getDate() + 1)
                            Notifications.scheduleLocalNotificationAsync(
                                createNotification(),
                                {
                                    time: tomorrow,
                                    repeat: 'day',
                                }
                            )
                            AsyncStorage.setItem(APP_NOTIFICATION_KEY, JSON.stringify(true))
                        }
                    })
            }
        })
}