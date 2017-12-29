import {nameToId} from "../utils/helpers";

/**
 * © 2017 Michal Rohac, All Rights Reserved.
 */

export const RESET_QUIZ_RESULT = 'RESET_QUIZ_RESULT'
export const UPDATE_QUIZ_RESULT = 'UPDATE_QUIZ_RESULT'

export function quizes(state = {}, action) {
    const {deck} = action
    switch (action.type) {
        case RESET_QUIZ_RESULT:
            const newState = {
                ...state,
                [deck]: {
                    "correctAnswers": 0,
                    "wrongAnswers": 0
                }
            }
            return newState
        case UPDATE_QUIZ_RESULT:
            const {quizStatus} = action
            return {
                ...state,
                [deck]: {
                    ...quizStatus
                }
            }
        default:
            return state
    }
}