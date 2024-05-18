import { createAsyncThunk } from "@reduxjs/toolkit"
import QuizService from "../../services/QuizService"
import { Question } from "../../types/quiz"

export const fetchQuestions = createAsyncThunk<Question[], number, { rejectValue: string }>(
    'quiz/fetchQuestions',
    async (limit: number, { rejectWithValue }) => {
        try {
            const response = await QuizService.getQuestions(limit)
            if (!Array.isArray(response.data)) {
                throw new Error('Incorrect format of the received data')
            }
            return JSON.parse(JSON.stringify(response.data), (_, v) => v === "true" ? true : v === "false" ? false : v)
        } catch (e) {
            if (e instanceof Error) {
                return rejectWithValue(e.message)
            } else {
                return rejectWithValue('An unexpected error occurred')
            }
        }
    }
)