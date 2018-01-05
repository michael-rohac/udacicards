/**
 * © 2017 Michal Rohac, All Rights Reserved.
 */
import {ADD_DECK, FETCH_DECKS, REMOVE_DECK, UPDATE_DECK} from './DeckReducer'

export function fetchDecks(decks) {
    return {
        type: FETCH_DECKS,
        decks
    }
}

export function addDeck(deck) {
    return {
        type: ADD_DECK,
        deck
    }
}

export function updateDeck(deck) {
    return {
        type: UPDATE_DECK,
        deck
    }
}

export function removeDeck(deckId) {
    return {
        type: REMOVE_DECK,
        deck: {
            id: deckId
        }
    }
}