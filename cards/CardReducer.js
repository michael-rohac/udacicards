/**
 * © 2017 Michal Rohac, All Rights Reserved.
 */
import {LogerFactory, LOGGER_DEBUG} from "../utils/logger";

export const FETCH_CARDS = 'FETCH_CARDS'
export const ADD_CARD = 'ADD_CARD'

const logger = LogerFactory(LOGGER_DEBUG)

export function cards(state = {}, action) {
    logger.debug('Card Reducer, about to process', action)
    const {deck, card} = action
    const cards = state[deck] ? state[deck] : []
    switch (action.type) {
        case FETCH_CARDS:
            return {
                ...state,
                [deck]: action.cards
            }
        case ADD_CARD:
            cards.push(card)
            return {
                ...state,
                [deck]: cards
            }
        default:
            return state
    }
}


