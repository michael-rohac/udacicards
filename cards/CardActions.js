/**
 * © 2017 Michal Rohac, All Rights Reserved.
 */
import {FETCH_CARDS} from './CardReducer'

export function fetchCards(deck, cards) {
    return {
        type: FETCH_CARDS,
        deck, cards
    }
}