/**
 * © 2017 Michal Rohac, All Rights Reserved.
 */
import {nameToId} from '../utils/helpers'

export const FETCH_DECKS = 'FETCH_DECKS'
export const ADD_DECK = 'ADD_DECK'
export const REMOVE_DECK = 'REMOVE_DECK'
export const UPDATE_DECK = 'UPDATE_DECK'

export function decks(state = {}, action) {
    switch (action.type) {
        case FETCH_DECKS:
            return {
                ...state,
                ...action.decks
            }
        case ADD_DECK:
            const deckId = nameToId(action.deck.title)
            return {
                ...state,
                [deckId]: {
                    id: deckId,
                    title: action.deck.title
                }
            }
        case REMOVE_DECK:
            let newState = {...state}
            delete newState[action.deck.id]
            return newState
        case UPDATE_DECK:
            return {
                ...state,
                [action.deck.id]: {
                    ...state[action.deck.id],
                    title: action.deck.title
                }
            }
        default:
            return state
    }
}
