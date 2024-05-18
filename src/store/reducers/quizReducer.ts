import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { QuizStatus } from "../../types/quiz"

interface QuizState {
    status: QuizStatus;
    questionCount: number;
}

const initialState: QuizState = {
    status: QuizStatus.START,
    questionCount: 5
}

const quizSlice = createSlice({
    name: 'quiz',
    initialState,
    reducers: {
        changeQuizStatus: (state, action: PayloadAction<QuizStatus>) => {
            state.status = action.payload
        },
        changeQuestionCount: (state, action: PayloadAction<number>) => {
            state.questionCount = action.payload
        }
    }
})

export const {
    changeQuizStatus,
    changeQuestionCount
} = quizSlice.actions

export default quizSlice.reducer