import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { Difficulty, Question, QuizStatus } from "../../types/quiz"
import { fetchQuestions } from "./actionCreators"
import QuestionHelper from "../../helpers/QuestionHelper"

interface Result {
    [key: string]: {
        correct: number;
        total: number;
    }
}

interface QuizState {
    status: QuizStatus;
    questionCount: number;
    isLoading: boolean;
    error: string;
    questions: Question[];
    currentQuestionIndex: number;
    result: Result;
}

const initialState: QuizState = {
    status: QuizStatus.START,
    questionCount: 5,
    isLoading: false,
    error: '',
    questions: [],
    currentQuestionIndex: 0,
    result: {
        Easy: {
            correct: 0,
            total: 0
        },
        Medium: {
            correct: 0,
            total: 0
        },
        Hard: {
            correct: 0,
            total: 0
        }
    }
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
        },
        checkAnswer: (state, action: PayloadAction<{
            difficulty: Difficulty,
            userAnswers: string[],
            correctAnswers: Record<string, boolean>
        }>) => {
            if (QuestionHelper.checkAnswer(action.payload.userAnswers, action.payload.correctAnswers)) {
                state.result[action.payload.difficulty].correct += 1
            }
        },
        changeCurrentQuestionIndex: (state, action: PayloadAction<number>) => {
            state.currentQuestionIndex = action.payload
        },
        restartQuiz: () => initialState
    },
    extraReducers: (builder) => {
        builder.addCase(fetchQuestions.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(fetchQuestions.fulfilled, (state, action: PayloadAction<Question[]>) => {
            state.isLoading = false
            state.error = ''
            state.questions = QuestionHelper.getProcessedQuestions(action.payload)
            state.result = QuestionHelper.getInitialResult(action.payload)

        })
        builder.addCase(fetchQuestions.rejected, (state, action: PayloadAction<string | undefined>) => {
            state.isLoading = false
            state.error = action.payload ?? 'An unexpected error occurred'
        })
    }
})

export const {
    changeQuizStatus,
    changeQuestionCount,
    changeCurrentQuestionIndex,
    checkAnswer,
    restartQuiz
} = quizSlice.actions

export default quizSlice.reducer