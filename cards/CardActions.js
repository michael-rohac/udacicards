/**
 * © 2017 Michal Rohac, All Rights Reserved.
 */
import {FETCH_CARDS, ADD_CARD} from './CardReducer'

export function fetchCards(deck, cards) {
    return {
        type: FETCH_CARDS,
        deck, cards
    }
}

export function addCard(deckId, card) {
    return {
        type: ADD_CARD,
        deck: deckId, card
    }
}