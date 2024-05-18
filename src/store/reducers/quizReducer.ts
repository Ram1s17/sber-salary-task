import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { Question, QuizStatus } from "../../types/quiz"
import { fetchQuestions } from "./actionCreators"

interface QuizState {
    status: QuizStatus;
    questionCount: number;
    isLoading: boolean;
    error: string;
    questions: Question[];
}

const initialState: QuizState = {
    status: QuizStatus.START,
    questionCount: 5,
    isLoading: false,
    error: '',
    questions: []
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
    },
    extraReducers: (builder) => {
        builder.addCase(fetchQuestions.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(fetchQuestions.fulfilled, (state, action: PayloadAction<Question[]>) => {
            state.isLoading = false
            state.error = ''
            state.questions = action.payload
        })
        builder.addCase(fetchQuestions.rejected, (state, action: PayloadAction<string | undefined>) => {
            state.isLoading = false
            state.error = action.payload ?? 'An unexpected error occurred'
        })
    }
})

export const {
    changeQuizStatus,
    changeQuestionCount
} = quizSlice.actions

export default quizSlice.reducer