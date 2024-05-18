import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { QuizStatus } from "../../types/quiz"

interface QuizState {
    status: QuizStatus;
}

const initialState: QuizState = {
    status: QuizStatus.START
}

const quizSlice = createSlice({
    name: 'quiz',
    initialState,
    reducers: {
        changeQuizStatus: (state, action: PayloadAction<QuizStatus>) => {
            state.status = action.payload
        }
    }
})

export const { changeQuizStatus } = quizSlice.actions

export default quizSlice.reducer