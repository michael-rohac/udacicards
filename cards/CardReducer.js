/**
 * © 2017 Michal Rohac, All Rights Reserved.
 */
import {LogerFactory, LOGGER_DEBUG} from "../utils/logger";

export const FETCH_CARDS = 'FETCH_CARDS'
export const ADD_CARD = 'ADD_CARD'
export const REMOVE_CARD = 'REMOVE_CARD'
export const UPDATE_CARD = 'UPDATE_CARD'

const logger = LogerFactory(LOGGER_DEBUG)

export function cards(state = {}, action) {
    logger.debug('Card Reducer, about to process', action)

    const {deck, card} = action
    switch (action.type) {
        case FETCH_CARDS:
            return {
                ...state,
                [deck]: action.cards
            }
        case ADD_CARD:
            return {
                ...state,
                [deck]: state[deck] ? state[deck].push(card) : [card]
            }
        default:
            return state
    }
}


