/**
 * © 2017 Michal Rohac, All Rights Reserved.
 */
import {RESET_QUIZ_RESULT, UPDATE_QUIZ_RESULT} from "./QuizReducer";

export function updateQuiz(deckId, quizStatus) {
    return {
        type: UPDATE_QUIZ_RESULT,
        deck: deckId, quizStatus
    }
}

export function resetQuiz(deckId) {
    return {
        type: RESET_QUIZ_RESULT,
        deck: deckId
    }
}